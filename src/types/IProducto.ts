import { ICategoria } from "./ICategoria";
import { IDescuento } from "./IDescuento";
import { IDetalleOrden } from "./IDetalleOrden";
import { IImagen } from "./IImagen";
import { IProductoTalle } from "./IProductoTalle";
import { ISubCategoria } from "./ISubCategoria";
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
  //categoria: ICategoria[];
  subcategoria: ISubCategoria[] | null;
  tipo: ITipo;
  productoTalles: IProductoTalle[];
  descuentos: IDescuento[];
}

export type ICrearProducto = Omit<IProducto, "id" | "eliminado" | "productoTalle">;