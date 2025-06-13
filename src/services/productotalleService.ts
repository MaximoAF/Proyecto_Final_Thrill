import { IProductoTalle } from '../types/IProductoTalle';
import { BaseService } from './BaseService';

export const productotalleService = new BaseService<IProductoTalle>('/productotalle');