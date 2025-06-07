import { IImageProducto } from "./IImageProducto";

export interface IProducto {
  id: number;
  imgs: IImageProducto[]
  nombre: string;
  stock: number;
  precio: number;
  idCategoria: number;
  descripcion: string;
  idTalleProducto: number;
  color: string;
  descuento: number;
}
