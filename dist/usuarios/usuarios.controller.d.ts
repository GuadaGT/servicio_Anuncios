import { UsuariosService } from './usuarios.service';
import { CreateUserDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { User } from './schemas/usuario.schema';
export declare class UsuariosController {
    private readonly usuarioService;
    constructor(usuarioService: UsuariosService);
    create(CreateUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | unknown>;
    update(id: string, UpdateUserDto: UpdateUsuarioDto): Promise<User | unknown>;
    remove(id: string): Promise<User | unknown>;
}
