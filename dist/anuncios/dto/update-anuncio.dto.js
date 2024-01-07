"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnuncioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_anuncio_dto_1 = require("./create-anuncio.dto");
class UpdateAnuncioDto extends (0, mapped_types_1.PartialType)(create_anuncio_dto_1.CreateAnuncioDto) {
}
exports.UpdateAnuncioDto = UpdateAnuncioDto;
//# sourceMappingURL=update-anuncio.dto.js.map