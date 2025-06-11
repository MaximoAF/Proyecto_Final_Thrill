import { ITalle } from "./ITalle";

export interface ITipo {
  id: number;
  nombre: string;
  talles: ITalle[];
}