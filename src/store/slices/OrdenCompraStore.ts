import { create } from "zustand";
import { IOrdenCompraState } from "../types/IOrdenCompraState";

export const useOrdenCompraStore = create<IOrdenCompraState>((set) => ({
  ordenes: [],
  activeOrden: null,

  setActiveOrden: (orden) => set({ activeOrden: orden }),
  clearActiveOrden: () => set({ activeOrden: null }),

  addOrden: (orden) => {
    set((state) => ({
      ordenes: [...state.ordenes, orden],
    }));
  },
  removeOrden: (ordenId) => {
    set((state) => ({
      ordenes: state.ordenes.filter((ord) => ord.id.toString() !== ordenId),
    }));
  },
  updateOrden: (orden) => {
    set((state) => ({
      ordenes: state.ordenes.map((ord) =>
        ord.id === orden.id ? orden : ord
      ),
    }));
  },

 
}));
