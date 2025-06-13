import { IProductoTalle } from "./IProductoTalle";

export interface IDetalleOrden {
  id: number;
  eliminado: boolean;
  cantidad: number;
  precio: number;
  productotalle: IProductoTalle;
}

export type ICrearDetalleOrden = Omit<IDetalleOrden, "id" | "eliminado">;