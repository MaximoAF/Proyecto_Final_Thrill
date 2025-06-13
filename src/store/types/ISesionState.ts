import { IUsuario } from "../../types/IUsuario";

export interface ISesionState {
  sesion: IUsuario | null;
  token: string | null;
  setSesion: (sesion: IUsuario) => void;
  setToken: (token: string) => void;
}
