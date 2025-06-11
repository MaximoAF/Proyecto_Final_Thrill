import { create } from "zustand";
import { IUsuarioState } from "../types/IusuarioState";
import { IUsuario } from "../../types/IUsuario";

export const UsuarioStore = create<IUsuarioState>((set, get) => ({
  usuarios: [
    {
      id: 1,
      nombre: 'Valentín Fernandez',
      email: 'valfer2003@gmail.com',
      password: 'prueba',
      idUsuarioDireccion: '',
    }
  ],



  activeUsuario: null,

  setActiveUsuario: (usuario: IUsuario) => set({ activeUsuario: usuario }),

  clearActiveUsuario: () => set({ activeUsuario: null }),

  addUsuario: (usuario: IUsuario) =>
    set((state) => ({
      usuarios: [...state.usuarios, usuario],
    })),

  updateUsuario: (usuario: IUsuario) =>
    set((state) => ({
      usuarios: state.usuarios.map((u) =>
        u.id === usuario.id ? usuario : u
      ),
    })),

  deleteUsuario: (id: number) =>
    set((state) => ({
      usuarios: state.usuarios.filter((u) => u.id !== id),
    })),

removeUsuario: (usuarioId: string) =>
  set((state) => ({
    usuarios: state.usuarios.filter((u) => u.id === Number(usuarioId)
),
  })),


  getUsuarioById: (usuarioId: string) => {
    return get().usuarios.find((u) => u.id.toString() === usuarioId);
  },
}));
