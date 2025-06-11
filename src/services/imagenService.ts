import { IImagen } from '../types/IImagen';
import { BaseService } from './BaseService';

export const imagenService = new BaseService<IImagen>('/imagens');