import { IProducto } from "./IProducto";
import { ITalle } from "./ITalle";

export interface IProductoTalle {
  id: number;
  eliminado: boolean;
  producto: IProducto;
  talle: ITalle;
  stock: number;
}