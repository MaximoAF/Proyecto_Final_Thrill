import { IDireccion } from '../types/IDireccion';
import { BaseService } from './BaseService';

export const direccionService = new BaseService<IDireccion>('/direccions');