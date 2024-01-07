import { Response } from 'express';
import { CreateUserDto } from 'src/usuarios/dto/create-usuario.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'src/usuarios/schemas/usuario.schema';
export declare class AuthController {
    private userService;
    private jwtService;
    constructor(userService: UsuariosService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<User>;
    login(loginUserDto: UpdateUsuarioDto, res: Response): Promise<void>;
    validarToken(req: Request): Promise<any>;
    private extractTokenFromHeader;
    refresh(body: any, response: Response): Promise<any>;
    private createCookie;
}
