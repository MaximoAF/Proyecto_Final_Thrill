import { ICrearDetalle, IDetalleOrden } from "./IDetalleOrden";
import { IDireccion } from "./IDireccion";
import { IUsuario } from "./IUsuario";

export interface IOrdenCompra {
  id: number;
  eliminado: boolean;
  fecha: string;
  cantidad: number;
  total: number;
  costoEnvio: number;
  metodoPago: string;
  estadoOrden: string;
  usuario: IUsuario;
  direccion: IDireccion;
  detalles: IDetalleOrden[];
}

export interface ICrearOrden {
  usuario: { id: number };
  direccion: { id: number };
  fecha: string;
  total: number;
  costoEnvio: number;
  detalles: ICrearDetalle[];
}
