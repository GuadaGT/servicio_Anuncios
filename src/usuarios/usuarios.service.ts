/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { User } from './schemas/usuario.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsuariosService 
{
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(crearUsuarioDto: CreateUserDto): Promise<User> 
        {
            const otroUsuario = await this.userModel.findOne({ username: crearUsuarioDto.username }).exec();
            if (otroUsuario) 
            {
                throw new BadRequestException({ message: 'Ya existe un usuario con ese nombre.' });
            }
            const nuevoUsuario = new this.userModel(crearUsuarioDto);
            return nuevoUsuario.save();
    }

    async findAll(): Promise<User[]> 
    {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User | unknown> 
    {
        return this.userModel.findById(id).exec();
    }

    async findByUsername(username: string): Promise<User | unknown> 
    {
        return this.userModel.findOne({ username }).exec();
    }

    async update(id: string, updateUserDto: UpdateUsuarioDto): Promise<User | unknown> 
    {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async remove(id: string): Promise<User | unknown> 
    {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}