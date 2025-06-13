import { create } from "zustand";
import { ISesionState } from "../types/ISesionState";
import { IUsuario } from "../../types/IUsuario";

export const useSesionStore = create<ISesionState>((set) => ({
  sesion: null,
  token: localStorage.getItem("token"),

  setSesion: (sesion: IUsuario) => {
    set({ sesion });
    localStorage.setItem("usuarioActivo", JSON.stringify(sesion));
  },

  setToken: (token: string) => {
    set({ token });
    localStorage.setItem("token", token);
  },

  closeSesion: () => {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("token");
    set({ sesion: null, token: null });
  },
}));
