import { IProducto } from "./IProducto";

export interface IDescuento {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  porcentajeDesc: number;
  productos: IProducto[];
}
