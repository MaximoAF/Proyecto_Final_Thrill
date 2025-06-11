import { ITipo } from "./ITipo";

export interface ITalle {
  id: number;
  eliminado: boolean;
  talle: string;
  tipo: ITipo;
}