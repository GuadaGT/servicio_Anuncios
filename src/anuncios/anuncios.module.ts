/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { AnunciosController } from './anuncios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Anuncio, AnuncioSchema } from './schemas/anuncio.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Anuncio.name, schema: AnuncioSchema}])],
  controllers: [AnunciosController],
  providers: [AnunciosService],
})
export class AnunciosModule {}
