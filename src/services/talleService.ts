import { ITalle } from '../types/ITalle';
import { BaseService } from './BaseService';

export const talleService = new BaseService<ITalle>('/talles');