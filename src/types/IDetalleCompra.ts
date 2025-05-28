import { IProducto } from "./IProducto";

export interface IDetalleCompra {
  id: number;
  cantidad: number;
  producto: IProducto;
  idOrdenDeCompra: number;
}
