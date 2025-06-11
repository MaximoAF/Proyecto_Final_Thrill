import { IUsuario } from "./IUsuario";

export interface IDireccion {
  id: number;
  eliminado: boolean;
  calle: string;
  localidad: string;
  codpostal: string;
  usuario: IUsuario;
}