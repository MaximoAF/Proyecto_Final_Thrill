import { IProducto } from "./IProducto";
import { ITalle } from "./ITalle";

export interface IProductoTalle {
  id: number;
  producto: IProducto;
  talle: ITalle;
  stock: number;
}