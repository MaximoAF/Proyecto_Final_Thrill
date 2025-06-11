import { IOrdenCompra } from '../types/IOrdenCompra';
import { BaseService } from './BaseService';

export const ordencompraService = new BaseService<IOrdenCompra>('/ordencompras');