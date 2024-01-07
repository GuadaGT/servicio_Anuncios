/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { AnunciosModule } from 'src/anuncios/anuncios.module';

@Module({
    controllers: [AuthController],
    providers: [UsuariosService, AuthGuard],
    imports: 
            [
                UsuariosModule,
                AnunciosModule,
                JwtModule.register({
                    global:true,
                    secret: process.env.JWT_SECRET,
                    signOptions: {expiresIn:"2m"}
                })
            ],
    exports: [AuthGuard]
})
export class AuthModule {}
