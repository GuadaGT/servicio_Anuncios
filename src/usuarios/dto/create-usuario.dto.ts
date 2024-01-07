/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

enum rol
{
    ADMIN = 'admin',
    USER = 'user',
}
export class CreateUserDto 
{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(rol)
    @IsNotEmpty()
    rol: string;
}