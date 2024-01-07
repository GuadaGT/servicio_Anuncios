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
exports.AnunciosController = void 0;
const common_1 = require("@nestjs/common");
const anuncios_service_1 = require("./anuncios.service");
const create_anuncio_dto_1 = require("./dto/create-anuncio.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const update_anuncio_dto_1 = require("./dto/update-anuncio.dto");
let AnunciosController = class AnunciosController {
    constructor(anuncioService) {
        this.anuncioService = anuncioService;
    }
    create(createAnuncioDto, req) {
        const user = req.user;
        try {
            const anuncio = this.anuncioService.create(createAnuncioDto, user);
            return anuncio;
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw new common_1.ForbiddenException(error.message);
            }
            else {
                throw error;
            }
        }
    }
    findAll() {
        return this.anuncioService.findAll();
    }
    findOne(id, req) {
        const user = req.user;
        return this.anuncioService.findOne(id, user);
    }
    update(id, updateAnuncioDto, req) {
        const user = req.user;
        try {
            const anuncio = this.anuncioService.update(id, updateAnuncioDto, user);
            return anuncio;
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error interno del servidor');
            }
        }
    }
    remove(id, req) {
        const user = req.user;
        try {
            const mensaje = this.anuncioService.remove(id, user);
            if (mensaje === null) {
                throw new common_1.NotFoundException('No se encontró el anuncio para eliminar');
            }
            return { message: mensaje };
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error interno del servidor');
            }
        }
    }
};
exports.AnunciosController = AnunciosController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_anuncio_dto_1.CreateAnuncioDto, Object]),
    __metadata("design:returntype", void 0)
], AnunciosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnunciosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AnunciosController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_anuncio_dto_1.UpdateAnuncioDto, Object]),
    __metadata("design:returntype", void 0)
], AnunciosController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AnunciosController.prototype, "remove", null);
exports.AnunciosController = AnunciosController = __decorate([
    (0, common_1.Controller)('anuncios'),
    __metadata("design:paramtypes", [anuncios_service_1.AnunciosService])
], AnunciosController);
//# sourceMappingURL=anuncios.controller.js.map