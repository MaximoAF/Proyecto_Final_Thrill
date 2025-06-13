import { IOrdenCompra } from '../types/IOrdenCompra';
import { BaseService } from './BaseService';
import api from "./api";

export const ordencompraService = new BaseService<IOrdenCompra>('/ordencompras');

interface OrdenPayload {
  usuario: { id: number };
  direccion: { id: number };
  detalles: {
    id: number;
    productoTalle: { id: number };
    cantidad: number;
    precio: number;
  }[];
}

export const crearPago = async (orden: OrdenPayload) => {
  try {
    const res = await api.post("/pagos/crear", orden);
    return res.data; // contiene { orden, init_point }
  } catch (error) {
    throw new Error("Error al crear el pago");
  }
};