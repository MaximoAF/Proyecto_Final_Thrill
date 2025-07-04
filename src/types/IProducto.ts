import { IDescuento } from "./IDescuento";
import { IImagen } from "./IImagen";
import { IProductoTalle } from "./IProductoTalle";
import { ICategoria } from "./ICategoria";
import { ITipo } from "./ITipo";

export interface IProducto {
  id: number;
  eliminado: boolean;
  nombre: string;
  precio: number;
  descripcion: string;
  color: string;
  marca: string;
  imagenes: IImagen[];
  categorias: ICategoria[];
  tipo: ITipo;
  productoTalles: IProductoTalle[];
  descuentos: IDescuento[];
}

export type ICrearProducto = Omit<IProducto, "id" | "eliminado" | "productoTalles">;