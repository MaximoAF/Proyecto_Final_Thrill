import { create } from "zustand";
import { ISesionState } from "../types/ISesionState";
import { IUsuario } from "../../types/IUsuario";

export const UsuarioStore = create<ISesionState>((set) => ({
  sesion: null,

  setSesion: (sesion: IUsuario) => {
    set({ sesion });
    localStorage.setItem("usuarioActivo", JSON.stringify(sesion));
  },

  closeSesion: () => {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("token");
    set({ sesion: null });
  },
}));

