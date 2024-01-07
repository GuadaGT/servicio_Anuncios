/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/usuarios/schemas/usuario.schema";

@Schema()
export class Anuncio
{
    @Prop()
    titulo: string;

    @Prop()
    descripcion: string;

    @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
    username: User;
}

export const AnuncioSchema = SchemaFactory.createForClass(Anuncio);