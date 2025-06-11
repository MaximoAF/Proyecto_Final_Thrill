import { ISubCategoria } from "./ISubCategoria";

export interface ICategoria {
  id: number;
  eliminado: boolean;
  nombre: string;
  subcategorias: ISubCategoria[];
}