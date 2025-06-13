import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ISesionState } from "../types/ISesionState";
import { IUsuario } from "../../types/IUsuario";

export const useSesionStore = create<ISesionState>()(
  persist(
    (set) => ({
      sesion: null,
      token: null,

      setSesion: (sesion: IUsuario) => {
        set({ sesion });
      },

      setToken: (token: string) => {
        set({ token });
      },
      closeSesion: () =>{
        set({ sesion : null}),
        set({ token : null})
      }
    }),
    {
      name: "sesion_thrill",
      partialize: (state) => ({
        sesion: state.sesion,
        token: state.token
      }),
    }
  )
);
