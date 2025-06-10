import { create } from "zustand";
import { ICategoriaState } from "../types/ICategoriaState";

export const UseCategoriaStore = create<ICategoriaState>((set, get) => ({
  categorias: [
    {
      id: 1,
      nombre: "Ropa Deportiva",
      idTipo: 1,
      idCategoriaPadre: 0,
    },
    {
      id: 2,
      nombre: "Ropa Casual",
      idTipo: 1,
      idCategoriaPadre: 0,
    },
  ],

  activeCategoria: null,

  setActiveCategoria: (categoria) =>
    set({ activeCategoria: categoria }),

  clearActiveCategoria: () =>
    set({ activeCategoria: null }),

  addCategoria: (categoria) =>
    set((state) => ({
      categorias: [...state.categorias, categoria],
    })),

  removeCategoria: (categoriaId) =>
    set((state) => ({
      categorias: state.categorias.filter(
        (p) => p.id.toString() !== categoriaId.toString()
      ),
    })),

  getCategoriaById: (categoriaId) => {
    return get().categorias.find(
      (p) => p.id.toString() === categoriaId.toString()
    );
  },

  updateCategoria: (categoria) =>
    set((state) => ({
      categorias: state.categorias.map((p) =>
        p.id.toString() === categoria.id.toString()
          ? { ...p, ...categoria }
          : p
      ),
    })),
}));
