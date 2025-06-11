import { IDetalleOrden } from "./IDetalleOrden";
import { IDireccion } from "./IDireccion";
import { IImagen } from "./IImagen";
import { IOrdenCompra } from "./IOrdenCompra";

export interface IUsuario {
  id: number;
  username: string;
  email: string;
  password: string;
  rol: string;
  imagenPerfil: IImagen;
  ordenes: IOrdenCompra[];
  direcciones: IDireccion[];
  carrito: IDetalleOrden[];
}