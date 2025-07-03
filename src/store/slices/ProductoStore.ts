import { create } from "zustand";
import { IProductoState } from "../types/IProductoState";
import { IProducto } from "../../types/IProducto";
import { productoService } from "../../services/productoService";

export const useProductoStore = create<IProductoState>((set, get) => ({
  productos: [],
  activeProducto: null,

  loadProducts: async () => {
    try {
      const data = await productoService.getAll();
      set({ productos: data });
    } catch (err) {
      console.error("Error al cargar productos:", err);
    }
  },

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

  removeProducto: (productoId: string | number) => {
    set((state) => ({
      productos: state.productos.filter(
        (producto) => producto.id.toString() !== productoId.toString()
      ),
    }));
  },

  getProductoById: (productoId: string | number) => {
    return get().productos.find(
      (producto) => producto.id.toString() === productoId.toString()
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
