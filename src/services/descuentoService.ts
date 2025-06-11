import { IDescuento } from '../types/IDescuento';
import { BaseService } from './BaseService';

export const descuentoService = new BaseService<IDescuento>('/descuentos');