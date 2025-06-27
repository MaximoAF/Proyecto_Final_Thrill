import { useSesionStore } from '../store/slices/SesionStore';
import { ITipo } from '../types/ITipo';
import { BaseService } from './BaseService';
import axios from 'axios';

const BASE_URL = 'https://api-thrill-production-85ac.up.railway.app/api/tipos';

export const tipoService = {
  ...new BaseService<ITipo>('/tipos'),

  getById: async (id: number): Promise<ITipo> => {
    const token = useSesionStore.getState().token;
    if (!token) throw new Error('No autenticado');

    const res = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
