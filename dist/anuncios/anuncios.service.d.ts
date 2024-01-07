/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Anuncio } from './schemas/anuncio.schema';
import { Model } from 'mongoose';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
export declare class AnunciosService {
    private anuncioSchema;
    constructor(anuncioSchema: Model<Anuncio>);
    create(createAnuncioDto: CreateAnuncioDto, user: any): Promise<Anuncio>;
    findAll(): Promise<Anuncio[]>;
    findOne(id: string, user: any): Promise<Anuncio | null>;
    update(id: string, updateAnuncioDto: UpdateAnuncioDto, user: any): Promise<Anuncio | null>;
    remove(id: string, user: any): Promise<Anuncio | unknown>;
}
