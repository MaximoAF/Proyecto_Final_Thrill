import { ICategoria } from "./ICategoria";
import { IDescuento } from "./IDescuento";
import { IDetalleOrden } from "./IDetalleOrden";
import { IImagen } from "./IImagen";
import { IProductoTalle } from "./IProductoTalle";
import { ISubCategoria } from "./ISubCategoria";
import { ITipo } from "./ITipo";

export interface IProducto {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  descripcion: string;
  color: string;
  marca: string;
  imagenes: IImagen[];
  categoria: ICategoria[];
  subcategoria: ISubCategoria[];
  tipo: ITipo;
  detalles: IDetalleOrden[];
  productoTalles: IProductoTalle[];
  descuentos: IDescuento[];
}