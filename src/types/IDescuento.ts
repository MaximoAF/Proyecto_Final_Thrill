import { IProducto } from "./IProducto";

export interface IDescuento {
  id: number;
  eliminado: boolean;
  fechaInicio: string;
  fechaFin: string;
  porcentajeDesc: number;
  productos: IProducto[];
}
