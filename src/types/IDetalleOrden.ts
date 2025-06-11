import { IProductoTalle } from "./IProductoTalle";

export interface IDetalleOrden {
  id: number;
  cantidad: number;
  precio: number;
  productotalle: IProductoTalle;
}
