import { IDetalleOrden } from '../types/IDetalleOrden';
import { BaseService } from './BaseService';

export const detalleordenService = new BaseService<IDetalleOrden>('/detalleordens');