import { IUsuario } from "../../types/IUsuario";

export interface IUsuarioState {
  usuarios: IUsuario[];
  activeUsuario: IUsuario | null;

  setActiveUsuario: (usuario: IUsuario) => void;
  clearActiveUsuario: () => void;

  addUsuario: (usuario: IUsuario) => void;
  removeUsuario: (usuarioId: string) => void;
  getUsuarioById: (usuarioId: string) => IUsuario | undefined;
  updateUsuario: (usuario: IUsuario) => void;
}