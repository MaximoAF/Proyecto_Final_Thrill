import { ITalle } from "./ITalle";

export interface ITipo {
  id: number;
  eliminado: boolean;
  nombre: string;
  talles: ITalle[];
}