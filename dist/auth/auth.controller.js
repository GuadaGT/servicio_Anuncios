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
exports.AuthController = void 0;
const bcrypt = require("bcryptjs");
const common_1 = require("@nestjs/common");
const create_usuario_dto_1 = require("../usuarios/dto/create-usuario.dto");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const update_usuario_dto_1 = require("../usuarios/dto/update-usuario.dto");
const jwt_1 = require("@nestjs/jwt");
const cookie_1 = require("cookie");
let AuthController = class AuthController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        return this.userService.create(createUserDto);
    }
    async login(loginUserDto, res) {
        const usuario = await this.userService.findByUsername(loginUserDto.username);
        if (!usuario) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const passOK = await bcrypt.compare(loginUserDto.password, usuario.password);
        if (!passOK) {
            throw new common_1.UnauthorizedException('Contraseña incorrecta');
        }
        const payload = { username: usuario.username, rol: usuario.rol };
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '1h' });
        res.json({ access_token, refresh_token });
    }
    async validarToken(req) {
        const token = this.extractTokenFromHeader(req);
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            return payload;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    extractTokenFromHeader(request) {
        const [tipo, token] = request.headers.authorization?.split(' ') ?? [];
        return tipo === 'Bearer' ? token : undefined;
    }
    async refresh(body, response) {
        const actual_refresh_token = body.refresh_token;
        try {
            const payload = await this.jwtService.verifyAsync(actual_refresh_token);
            const access_token = await this.jwtService.signAsync(payload);
            const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '1h' });
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            };
            response.setHeader('Set-Cookie', this.createCookie.call(this, 'refresh_token', refresh_token, cookieOptions));
            return { access_token, refresh_token };
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    createCookie(name, value, options) {
        const serializedCookie = (0, cookie_1.serialize)(name, value, options);
        return serializedCookie;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_usuario_dto_1.UpdateUsuarioDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/validar'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validarToken", null);
__decorate([
    (0, common_1.Post)('/refresh'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService, jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map