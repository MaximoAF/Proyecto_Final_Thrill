import { IUsuario } from "../../types/IUsuario";

export interface ISesionState {
  sesion: IUsuario | null;
  setSesion: (sesion: IUsuario) => void;
  closeSesion: () => void;
}