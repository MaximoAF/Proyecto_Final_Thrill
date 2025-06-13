import { create } from "zustand";
import { ITalleState } from "../types/ITalleState";
import { talleService } from "../../services/talleService";

export const useTalleStore = create<ITalleState>((set, get) => ({
  talles: [],
  activeTalle: null,

  loadTalles: async () => {
    const current = get().talles;
    if (current.length > 0) return;

    try {
      const data = await talleService.getAll();
      set({ talles: data });
    } catch (err) {
      console.error("Error al cargar talles:", err);
    }
  },

  setActiveTalle: (talle) => set({ activeTalle: talle }),
  clearActiveTalle: () => set({ activeTalle: null }),

  addTalle: (talle) =>
    set((state) => {
      if (state.talles.some((cat) => cat.id === talle.id)) return state;
      return { talles: [...state.talles, talle] };
    }),
  removeTalle: (talleId) => {
    set((state) => ({
      talles: state.talles.filter((cat) => cat.id !== talleId),
    }));
  },
  updateTalle: (talle) => {
    set((state) => ({
      talles: state.talles.map((cat) =>
        cat.id === talle.id ? talle : cat
      ),
    }));
  },
  getTalleById: (talleId) =>
    get().talles.find((cat) => cat.id === talleId)
}));
