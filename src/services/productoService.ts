import { IProducto } from '../types/IProducto';
import { BaseService } from './BaseService';

export const productoService = new BaseService<IProducto>('/productos');