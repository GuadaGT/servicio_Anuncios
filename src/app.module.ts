/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { AnunciosModule } from './anuncios/anuncios.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: 
  [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsuariosModule,
    AuthModule,
    AnunciosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
