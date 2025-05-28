import { create } from "zustand";
import { ICarritoState } from "../types/ICarritoState";

export const useCarritoStore = create<ICarritoState>((set) => ({
  detallesProducto: [],
  activeProductoDetalle: null,

  setActiveProductoDetalle: (detalle) =>
    set({ activeProductoDetalle: detalle }),
  clearActiveProductoDetalle: () => set({ activeProductoDetalle: null }),

  addProductoDetalle: (detalle) => {
    set((state) => ({
      detallesProducto: [...state.detallesProducto, detalle],
    }));
  },
  removeProductoDetalle: (detalleId) => {
    set((state) => ({
      detallesProducto: state.detallesProducto.filter(
        (detalle) => String(detalle.id) !== String(detalleId)
      ),
    }));
  },
  addCantidad: (detalleId) => {
    set((state) => ({
      detallesProducto: state.detallesProducto.map((detalle) =>
        String(detalle.id) === String(detalleId)
          ? { ...detalle, cantidad: detalle.cantidad + 1 }
          : detalle
      ),
    }));
  },
  discountCantidad: (detalleId) => {
    set((state) => ({
      detallesProducto: state.detallesProducto.map((detalle) =>
        String(detalle.id) === String(detalleId)
          ? { ...detalle, cantidad: detalle.cantidad - 1 }
          : detalle
      ),
    }));
  },
}));
