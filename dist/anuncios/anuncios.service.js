"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnunciosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const anuncio_schema_1 = require("./schemas/anuncio.schema");
const mongoose_2 = require("mongoose");
let AnunciosService = class AnunciosService {
    constructor(anuncioSchema) {
        this.anuncioSchema = anuncioSchema;
    }
    async create(createAnuncioDto, user) {
        console.log('user.rol:', user.rol);
        console.log('user.username:', user.username);
        console.log('createAnuncioDto.usuario:', createAnuncioDto.usuario);
        if (user.rol !== 'admin' && user.username !== createAnuncioDto.usuario) {
            throw new common_1.ForbiddenException('No tienes permiso para crear este anuncio');
        }
        const nuevoAnuncio = new this.anuncioSchema(createAnuncioDto);
        await nuevoAnuncio.save();
        return nuevoAnuncio;
    }
    async findAll() {
        return this.anuncioSchema.find().exec();
    }
    async findOne(id, user) {
        const anuncio = await this.anuncioSchema.findById(id).exec();
        if (!anuncio || !('usuario' in anuncio) || (anuncio.usuario !== user.username && user.rol !== 'admin')) {
            throw new common_1.NotFoundException(`No tienes permiso para ver este anuncio`);
        }
        return anuncio;
    }
    async update(id, updateAnuncioDto, user) {
        console.log('user.rol:', user.rol);
        console.log('user.username:', user.username);
        console.log('ID del anuncio a actualizar (desde el servicio):', id);
        try {
            if (user.rol !== 'admin') {
                const anuncio = await this.anuncioSchema.findById(id).exec();
                if (!anuncio || anuncio.username !== user.username) {
                    throw new common_1.ForbiddenException('No tienes permiso para actualizar este anuncio');
                }
            }
            const updatedAnuncio = await this.anuncioSchema.findByIdAndUpdate(id, updateAnuncioDto, { new: true }).exec();
            return updatedAnuncio;
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error interno del servidor');
            }
        }
    }
    async remove(id, user) {
        console.log('user.rol:', user.rol);
        console.log('user.username:', user.username);
        console.log('ID del anuncio a eliminar (desde el servicio):', id);
        try {
            if (user.rol !== 'admin') {
                const anuncio = await this.anuncioSchema.findById(id).exec();
                if (!anuncio || anuncio.username !== user.username) {
                    throw new common_1.ForbiddenException('No tienes permiso para eliminar este anuncio');
                }
            }
            const anuncioEliminado = await this.anuncioSchema.findByIdAndDelete(id).exec();
            console.log('Anuncio eliminado:', anuncioEliminado);
            if (!anuncioEliminado || !('usuario' in anuncioEliminado)) {
                return null;
            }
            return `Anuncio con ID ${id} eliminado correctamente`;
        }
        catch (error) {
            return 'Error al intentar eliminar el anuncio: ' + (error.message || 'Permiso denegado');
        }
    }
};
exports.AnunciosService = AnunciosService;
exports.AnunciosService = AnunciosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(anuncio_schema_1.Anuncio.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnunciosService);
//# sourceMappingURL=anuncios.service.js.map