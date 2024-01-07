/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/usuarios/dto/create-usuario.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'src/usuarios/schemas/usuario.schema';
import { CookieOptions, serialize } from 'cookie';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsuariosService, private jwtService: JwtService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginUserDto: UpdateUsuarioDto, @Res() res: Response): Promise<void> {
    const usuario: User | unknown = await this.userService.findByUsername(loginUserDto.username);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const passOK = await bcrypt.compare(loginUserDto.password, (usuario as User).password);

    if (!passOK) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { username: (usuario as User).username, rol: (usuario as User).rol };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '1h' });

    res.json({ access_token, refresh_token });
  }

  @Get('/validar')
  async validarToken(@Req() req: Request): Promise<any> {
    const token = this.extractTokenFromHeader(req);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined 
  {
    const [tipo, token] = request.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }

  @Post('/refresh')
  async refresh(@Body() body, @Res({ passthrough: true }) response: Response): Promise<any> 
  {
    const actual_refresh_token = body.refresh_token;
    try 
    {
      const payload = await this.jwtService.verifyAsync(actual_refresh_token);

      const access_token = await this.jwtService.signAsync(payload);
      const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '1h' });
      const cookieOptions: CookieOptions = 
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      };
      response.setHeader('Set-Cookie', this.createCookie.call(this, 'refresh_token', refresh_token, cookieOptions));
      return { access_token, refresh_token };
    } 
    catch (error)   
    {
      throw new UnauthorizedException();
    }
  }

  private createCookie(name: string, value: string, options: CookieOptions): string
  {
    const serializedCookie = serialize(name, value, options);
    return serializedCookie;
  }
}