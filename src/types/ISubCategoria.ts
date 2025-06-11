import { ICategoria } from "./ICategoria";
import { IProducto } from "./IProducto";

export interface ISubCategoria {
  id: number;
  eliminado: boolean;
  nombre: string;
  categoria: ICategoria;
  productos: IProducto[];
}