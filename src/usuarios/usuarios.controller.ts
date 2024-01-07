/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUserDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { User } from './schemas/usuario.schema';

@Controller('usuarios')
export class UsuariosController 
{
    constructor(private readonly usuarioService: UsuariosService) {}

    @Post()
    create(@Body() CreateUserDto: CreateUserDto): Promise<User>
    {
        return this.usuarioService.create(CreateUserDto);
    }

    @Get()
    findAll(): Promise<User[]>
    {
        return this.usuarioService.findAll();
    }

    @Get()
    findOne(@Param('id') id: string): Promise<User | unknown>
    {
        return this.usuarioService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUsuarioDto): Promise<User | unknown>
    {
        return this.usuarioService.update(id, UpdateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<User | unknown>
    {
        return this.usuarioService.remove(id);
    }
}
