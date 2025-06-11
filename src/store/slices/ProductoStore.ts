import { create } from "zustand";
import { IProductoState } from "../types/IProductoState";
import { IProducto } from "../../types/IProducto";

export const useProductoStore = create<IProductoState>((set, get) => ({
  productos: [],
  activeProducto: null,

  setActiveProducto: (producto: IProducto | null) => {
    set({ activeProducto: producto });
  },

  clearActiveProducto: () => {
    set({ activeProducto: null });
  },

  addProducto: (producto: IProducto) => {
    set((state) => ({
      productos: [...state.productos, producto],
    }));
  },

removeProducto: (productoId) => {
  set((state) => ({
    productos: state.productos.filter(
      (producto) => producto.id.toString() !== productoId
    ),
  }));
},

getProductoById: (productoId) => {
  return get().productos.find(
    (producto) => producto.id.toString() === productoId
  );
},

  updateProducto: (producto: IProducto) => {
    set((state) => ({
      productos: state.productos.map((p) =>
        p.id === producto.id ? producto : p
      ),
    }));
  },
}));
