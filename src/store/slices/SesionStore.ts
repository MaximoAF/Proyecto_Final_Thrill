import { create } from "zustand";
import { ISesionState } from "../types/ISesionState";
import { IUsuario } from "../../types/IUsuario";

export const useSesionStore = create<ISesionState>((set) => ({
  sesion: null,

  setSesion: (sesion: IUsuario ) => {
    set({ sesion: sesion });
  },
  closeSesion: () => {
    set({ sesion: null });
  },
}));
