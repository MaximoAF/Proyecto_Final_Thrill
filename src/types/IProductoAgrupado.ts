import { IImageProducto } from "./IImageProducto";
import { ITalleStockAgrupado } from './ITalleStockAgrupado';

export interface IProductoAgrupado {
  id: number;
  imgs: IImageProducto[]
  nombre: string;
  precio: number;
  idCategoria: number;
  descripcion: string;
  talleStock: ITalleStockAgrupado[];
  color: string;
}
