import { ICrearOrden, IOrdenCompra } from "../types/IOrdenCompra";
import { BaseService } from "./BaseService";
import api from "./api";

export const ordencompraService = new BaseService<IOrdenCompra>(
  "/ordencompras"
);
interface RespuestaPago {
  orden: IOrdenCompra;
  init_point: string;
}

export const crearPago = async (orden: ICrearOrden): Promise<RespuestaPago> => {
  try {
    const res = await api.post("/pagos/crear", orden);
    return res.data; // Devuelve { orden, init_point }
  } catch (error) {
    throw new Error("Error al crear el pago");
  }
};

export const getOrdenesByUser = async (id: number): Promise<IOrdenCompra[]> => {
  try {
    const res = await api.get(`/pagos/usuario/${id}`);
    return res.data; 
  } catch (error) {
    throw new Error("Error al Obtener Ordenes de usuario: ");
  }
};
