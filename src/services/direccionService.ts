import { ICrearDireccion, IDireccion } from '../types/IDireccion';
import { BaseService } from './BaseService';

export const direccionService = new BaseService<IDireccion, ICrearDireccion>('/direcciones');