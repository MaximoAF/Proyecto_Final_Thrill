import { IUsuario } from '../types/IUsuario';
import { BaseService } from './BaseService';

export const usuarioService = new BaseService<IUsuario>('/usuarios');