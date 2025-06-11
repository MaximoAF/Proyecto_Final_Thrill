import { IDetalleOrden } from "./IDetalleOrden";
import { IDireccion } from "./IDireccion";
import { IUsuario } from "./IUsuario";

export interface IOrdenCompra {
  id: number;
  fecha: string;
  cantidad: number;
  total: number;
  metodoPago: string;
  estadoOrden: string;
  usuario: IUsuario;
  direccion: IDireccion;
  detalles: IDetalleOrden[];
}