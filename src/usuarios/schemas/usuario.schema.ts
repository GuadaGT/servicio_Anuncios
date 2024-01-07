/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

enum rol
{
    ADMIN = 'admin',
    USER = 'user',
}
@Schema()
export class User
{
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop(rol)
    rol: string;
}

export const UserSchema = SchemaFactory.createForClass(User);