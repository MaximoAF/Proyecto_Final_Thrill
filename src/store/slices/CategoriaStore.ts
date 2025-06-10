import { create } from "zustand";
import { categoriasEjemplo } from "../../types/ICategoria";
import { ICategoriaState } from "../types/ICategoriaState";

export const useCategoriaStore = create<ICategoriaState>((set, get) => ({
  categorias: categoriasEjemplo,
  activeCategoria: null,

  tiposUnicos: Array.from(new Set(categoriasEjemplo.map((cat) => cat.tipo))),

  setActiveCategoria: (categoria) => set({ activeCategoria: categoria }),
  clearActiveCategoria: () => set({ activeCategoria: null }),

  addCategoria: (categoria) => {
    set((state) => ({
      categorias: [...state.categorias, categoria],
    }));
  },
  removeCategoria: (categoriaId) => {
    set((state) => ({
      categorias: state.categorias.filter((cat) => cat.id !== categoriaId),
    }));
  },
  updateCategoria: (categoria) => {
    set((state) => ({
      categorias: state.categorias.map((cat) =>
        cat.id === categoria.id ? categoria : cat
      ),
    }));
  },
  getCategoriaById: (categoriaId) => get().categorias.find((cat) => cat.id === categoriaId),
  getCategoriaByName: (categoriaName) => get().categorias.find((cat) => cat.nombre.toLowerCase() === categoriaName.toLowerCase()),
}));
