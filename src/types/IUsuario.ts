import { IDetalleOrden } from "./IDetalleOrden";
import { IDireccion } from "./IDireccion";
import { IImagen } from "./IImagen";
import { IOrdenCompra } from "./IOrdenCompra";

export interface IUsuario {
  id: number;
  eliminado: boolean;
  username: string;
  email: string;
  password: string;
  rol: string;
  imagenPerfil: IImagen | null;
  ordenes: IOrdenCompra[];
  direcciones: IDireccion[];
  carrito: IDetalleOrden[];
}
export type ICrearUsuario = Omit<IUsuario, "id" | "creadoEn" >;

// Interfaces de inicio de sesion 
export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
}