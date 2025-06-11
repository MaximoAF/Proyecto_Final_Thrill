import { IUsuario } from "./IUsuario";

export interface IDireccion {
  id: number;
  calle: string;
  localidad: string;
  codpostal: string;
  usuario: IUsuario;
}