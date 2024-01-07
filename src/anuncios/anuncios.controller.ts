/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, UseGuards, Post, Body, Req, Param, Get, Patch, Delete, ForbiddenException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { Anuncio } from './schemas/anuncio.schema';
import { Request } from 'express';
import { User } from '../usuarios/schemas/usuario.schema';

@Controller('anuncios')
export class AnunciosController 
{
    constructor(private readonly anuncioService: AnunciosService){}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createAnuncioDto: CreateAnuncioDto, @Req() req: Request) 
    {
        const user = req.user;
        try {
          const anuncio = this.anuncioService.create(createAnuncioDto, user);
          return anuncio;
        } 
        catch (error) 
        {
          if (error instanceof ForbiddenException) {
            throw new ForbiddenException(error.message);
          } 
          else 
          {
            throw error;
          }
        }
      }

    @Get()
    findAll() 
    {
        return this.anuncioService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: Request): Promise<Anuncio | null> 
    {
        const user = req.user;
        return this.anuncioService.findOne(id, user);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAnuncioDto: UpdateAnuncioDto, @Req() req: Request) 
    {
      const user = req.user;
      try 
      {
        const anuncio = this.anuncioService.update(id, updateAnuncioDto, user);
        return anuncio;
      }
      catch (error) 
      {
        if (error instanceof ForbiddenException || error instanceof NotFoundException) {
            throw error;
        } else {
            throw new InternalServerErrorException('Error interno del servidor');
        }
    }
}

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: Request) 
    {
      const user = req.user;
      try 
      {
        const mensaje = this.anuncioService.remove(id, user);
        if (mensaje === null) 
        {
            throw new NotFoundException('No se encontró el anuncio para eliminar');
        }
        return { message: mensaje };
      } 
      catch (error) 
      {
        if (error instanceof ForbiddenException || error instanceof NotFoundException) 
        {
            throw error;
        } 
        else 
        {
            throw new InternalServerErrorException('Error interno del servidor');
        }
      }
    }
}