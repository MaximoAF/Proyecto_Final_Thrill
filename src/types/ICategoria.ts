import { ISubCategoria } from "./ISubCategoria";

export interface ICategoria {
  id: number;
  nombre: string;
  subcategorias: ISubCategoria[];
}