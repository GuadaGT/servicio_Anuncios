/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/usuario.schema';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: 
  [
    MongooseModule.forFeature
    ([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UsuariosController],
  providers:
  [
    UsuariosService,
    AuthGuard
  ],
  exports: 
  [
    MongooseModule.forFeature
    ([{name: User.name, schema:UserSchema}])
  ]
})
export class UsuariosModule {}