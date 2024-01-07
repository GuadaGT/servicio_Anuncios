import { AnunciosService } from './anuncios.service';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { Anuncio } from './schemas/anuncio.schema';
import { Request } from 'express';
export declare class AnunciosController {
    private readonly anuncioService;
    constructor(anuncioService: AnunciosService);
    create(createAnuncioDto: CreateAnuncioDto, req: Request): Promise<Anuncio>;
    findAll(): Promise<Anuncio[]>;
    findOne(id: string, req: Request): Promise<Anuncio | null>;
    update(id: string, updateAnuncioDto: UpdateAnuncioDto, req: Request): Promise<Anuncio>;
    remove(id: string, req: Request): {
        message: Promise<unknown>;
    };
}
