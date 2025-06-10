import { create } from "zustand";
import { ICarritoState } from "../types/ICarritoState";

export const useCarritoStore = create<ICarritoState>((set, get) => ({
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
  addCantidad: (detalleId, cantidad) => {
    set((state) => ({
      detallesProducto: state.detallesProducto.map((detalle) => {
        if (detalle.id.toString() === detalleId.toString()) {
          if (detalle.cantidad + cantidad <= detalle.producto.stock) {
            return { ...detalle, cantidad: detalle.cantidad + cantidad };
          } else {
            return detalle;
          }
        } else {
          return detalle;
        }
      }),
    }));
  },
  discountCantidad: (detalleId, cantidad) => {
    set((state) => ({
      detallesProducto: state.detallesProducto.map((detalle) => {
        if (detalle.id.toString() === detalleId.toString()) {
          if (detalle.cantidad - cantidad >= 0) {
            return { ...detalle, cantidad: detalle.cantidad -cantidad };
          } else {
            return detalle;
          }
        } else {
          return detalle;
        }
      }),
    }));
  },
  getDetalleById: (detalleId) =>
    get().detallesProducto.find(
      (detalle) => detalle.id.toString() === detalleId
    ),
}));
