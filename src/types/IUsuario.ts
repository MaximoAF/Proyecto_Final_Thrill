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
<<<<<<< HEAD
  imagenPerfil?: IImagen;
=======
  imagenPerfil: IImagen | null;
>>>>>>> main
  ordenes: IOrdenCompra[];
  direcciones: IDireccion[];
  carrito: IDetalleOrden[];
}
export type ICrearUsuario = Omit<IUsuario, "id" | "creadoEn" >;