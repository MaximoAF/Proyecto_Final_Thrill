import { IProductoTalle } from "./IProductoTalle";

export interface IDetalleOrden {
  id: number;
  eliminado: boolean;
  cantidad: number;
  precio: number;
  productoTalle: IProductoTalle;
}

export interface ICrearDetalle {
  productoTalle: { id: number };
  cantidad: number;
  precio: number;
}
