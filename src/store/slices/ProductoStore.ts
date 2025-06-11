import { create } from "zustand";
import { IProductoState } from "../types/IProductoState";
import { IProducto } from "../../types/IProducto";

export const useProductoStore = create<IProductoState>((set, get) => ({
  productos: [],
  activeProducto: null,

  setActiveProducto: (producto) => set({ activeProducto: producto }),
  clearActiveProducto: () => set({ activeProducto: null }),

  addProducto: (producto) =>
    set((state) => ({
      productos: [...state.productos, producto],
    })),

  removeProducto: (productoId) =>
    set((state) => ({
      productos: state.productos.filter((p) => p.id.toString() !== productoId),
    })),

  getProductoById: (productoId) =>
    get().productos.find((p) => p.id.toString() === productoId),

  updateProducto: (producto) =>
    set((state) => ({
      productos: state.productos.map((p) =>
        p.id.toString() === producto.id.toString() ? { ...p, ...producto } : p
      ),
    })),
}));
