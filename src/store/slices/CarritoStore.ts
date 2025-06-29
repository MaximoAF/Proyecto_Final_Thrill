import { create } from "zustand";
import { ICarritoState } from "../types/ICarritoState";
import { persist } from "zustand/middleware";

export const useCarritoStore = create<ICarritoState>()(
  persist(
    (set, get) => ({
      detallesProducto: [],
      activeProductoDetalle: null,

      setActiveProductoDetalle: (detalle) =>
        set({ activeProductoDetalle: detalle }),

      clearActiveProductoDetalle: () => set({ activeProductoDetalle: null }),

      addProductoDetalle: (detalle) =>
        set((state) => ({
          detallesProducto: [...state.detallesProducto, detalle],
        })),

      clearCarrito: () => set({ detallesProducto: [] }),

      removeProductoDetalle: (detalleId) =>
        set((state) => ({
          detallesProducto: state.detallesProducto.filter(
            (detalle) => String(detalle.id) !== String(detalleId)
          ),
        })),

      addCantidad: (detalleId, cantidad) =>
        set((state) => ({
          detallesProducto: state.detallesProducto.map((detalle) =>
            detalle.id.toString() === detalleId.toString()
              ? {
                  ...detalle,
                  cantidad:
                    detalle.cantidad + cantidad <= detalle.productotalle.stock
                      ? detalle.cantidad + cantidad
                      : detalle.productotalle.stock,
                }
              : detalle
          ),
        })),

      discountCantidad: (detalleId, cantidad) =>
        set((state) => ({
          detallesProducto: state.detallesProducto.map((detalle) =>
            detalle.id.toString() === detalleId.toString()
              ? {
                  ...detalle,
                  cantidad:
                    detalle.cantidad - cantidad >= 0
                      ? detalle.cantidad - cantidad
                      : detalle.cantidad,
                }
              : detalle
          ),
        })),

      getDetalleById: (detalleId) =>
        get().detallesProducto.find(
          (detalle) => detalle.id.toString() === detalleId
        ),
    }),
    {
      name: "carrito_thrill", // clave del localStorage
      partialize: (state) => ({
        detallesProducto: state.detallesProducto,
      }),
    }
  )
);
