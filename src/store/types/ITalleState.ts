import { ITalle } from "../../types/ITalle";

export interface ITalleState {
  talles: ITalle[];
  activeTalle: ITalle | null;

  loadTalles: () => Promise<void>;

  setActiveTalle: (talle: ITalle) => void;
  clearActiveTalle: () => void;

  addTalle: (talle: ITalle) => void;
  removeTalle: (talleId: number) => void;
  updateTalle: (talle: ITalle) => void;

  getTalleById: (talleId: number) => ITalle | undefined;
}