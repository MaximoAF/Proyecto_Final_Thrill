import { ITipo } from '../types/ITipo';
import { BaseService } from './BaseService';

export const tipoService = new BaseService<ITipo>('/tipos');