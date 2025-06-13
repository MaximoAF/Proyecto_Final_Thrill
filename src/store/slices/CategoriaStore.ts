import { create } from "zustand";
import { ICategoriaState } from "../types/ICategoriaState";
import { categoriaService } from "../../services/categoriaService";

export const useCategoriaStore = create<ICategoriaState>((set, get) => ({
  categorias: [],
  activeCategoria: null,

  loadCategoria: async () => {
    const current = get().categorias;
    if (current.length > 0) return;

    try {
      const data = await categoriaService.getAll();
      set({ categorias: data });
    } catch (err) {
      console.error("Error al cargar categorias:", err);
    }
  },


  setActiveCategoria: (categoria) => set({ activeCategoria: categoria }),
  clearActiveCategoria: () => set({ activeCategoria: null }),

  addCategoria: (categoria) =>
    set((state) => {
      if (state.categorias.some((cat) => cat.id === categoria.id)) return state;
      return { categorias: [...state.categorias, categoria] };
    }),

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

  getCategoriaById: (categoriaId) =>
    get().categorias.find((cat) => cat.id === categoriaId),

  getCategoriaByName: (categoriaName) =>
    get().categorias.find(
      (cat) => cat.nombre.toLowerCase() === categoriaName.toLowerCase()
    ),
}));
