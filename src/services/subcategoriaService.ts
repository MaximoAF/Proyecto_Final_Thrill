import { ISubCategoria } from '../types/ISubCategoria';
import { BaseService } from './BaseService';

export const subcategoriaService = new BaseService<ISubCategoria>('/subcategorias');