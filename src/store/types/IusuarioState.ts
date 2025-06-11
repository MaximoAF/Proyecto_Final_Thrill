import { IUsuario } from "../../types/IUsuario";

export interface IUsuarioState {
  usuarios: IUsuario[];
  activeUsuario: IUsuario | null;
  token: string | null;

  setActiveUsuario: (usuario: IUsuario) => void;
  setToken: (token: string) => void;  // <-- Agregá esta función
  clearSession: () => void;

  addUsuario: (usuario: IUsuario) => void;
  updateUsuario: (usuario: IUsuario) => void;
  deleteUsuario: (id: number) => void;
  removeUsuario: (usuarioId: string) => void;
  getUsuarioById: (usuarioId: string) => IUsuario | undefined;
}
