/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Anuncio } from './schemas/anuncio.schema';
import { Model } from 'mongoose';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';

@Injectable()
export class AnunciosService 
{
    constructor(@InjectModel(Anuncio.name) private anuncioSchema: Model<Anuncio>){}

    async create(createAnuncioDto: CreateAnuncioDto, user: any): Promise<Anuncio> 
    {
        console.log('user.rol:', user.rol);
        console.log('user.username:', user.username);
        console.log('createAnuncioDto.usuario:', createAnuncioDto.usuario);
    
        if (user.rol !== 'admin' && user.username !== createAnuncioDto.usuario) 
        {
            throw new ForbiddenException('No tienes permiso para crear este anuncio');
        }
        const nuevoAnuncio = new this.anuncioSchema(createAnuncioDto);
        await nuevoAnuncio.save();
        return nuevoAnuncio;
    }

    async findAll(): Promise<Anuncio[]> 
    {
        return this.anuncioSchema.find().exec();
    }

    async findOne(id: string, user: any): Promise<Anuncio | null> 
    {
        const anuncio = await this.anuncioSchema.findById(id).exec();
        if (!anuncio || !('usuario' in anuncio) || (anuncio.usuario !== user.username && user.rol !== 'admin')) 
        {
            throw new NotFoundException(`No tienes permiso para ver este anuncio`);
        }
        return anuncio;
    }

    async update(id: string, updateAnuncioDto: UpdateAnuncioDto, user: any): Promise<Anuncio | null> 
    {
        console.log('user.rol:', user.rol);
        console.log('user.username:', user.username);
        console.log('ID del anuncio a actualizar (desde el servicio):', id);

        try 
        {
            if (user.rol !== 'admin') 
            {
                const anuncio: any = await this.anuncioSchema.findById(id).exec();
                if (!anuncio || anuncio.username !== user.username) 
                {
                    throw new ForbiddenException('No tienes permiso para actualizar este anuncio');
                }
            }
            const updatedAnuncio = await this.anuncioSchema.findByIdAndUpdate(
                id,
                updateAnuncioDto,
                { new: true }).exec();
            return updatedAnuncio;
        } 
        catch (error)
        {
            if (error instanceof ForbiddenException) 
            {
                throw error;
            }    
            else 
            {
                throw new InternalServerErrorException('Error interno del servidor');
            }
        }
    }
    
    async remove(id: string, user: any): Promise<Anuncio | unknown> 
    {
        console.log('user.rol:', user.rol);
        console.log('user.username:', user.username);
        console.log('ID del anuncio a eliminar (desde el servicio):', id);
        try 
        {
            if (user.rol !== 'admin') 
            {
                const anuncio: any = await this.anuncioSchema.findById(id).exec();

                if (!anuncio || anuncio.username !== user.username) 
                {
                    throw new ForbiddenException('No tienes permiso para eliminar este anuncio');
                }
            }
            const anuncioEliminado = await this.anuncioSchema.findByIdAndDelete(id).exec();
            console.log('Anuncio eliminado:', anuncioEliminado);
            if (!anuncioEliminado || !('usuario' in anuncioEliminado)) 
            {
                return null;
            }
            return `Anuncio con ID ${id} eliminado correctamente`;
        }   
        catch (error) 
        {
        return 'Error al intentar eliminar el anuncio: ' + (error.message || 'Permiso denegado');
        }
    }
}