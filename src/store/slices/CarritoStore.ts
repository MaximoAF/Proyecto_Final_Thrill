import { create } from "zustand";
import { ICarritoState } from "../types/ICarritoState";

export const useCarritoStore = create<ICarritoState>((set, get) => ({
  detallesProducto: [],
  activeProductoDetalle: null,

<<<<<<< HEAD
  setActiveProductoDetalle: (detalle) =>
    set({ activeProductoDetalle: detalle }),
  clearActiveProductoDetalle: () => set({ activeProductoDetalle: null }),
=======
export const useCarritoStore = create<ICarritoState>((set) => ({
  detallesProducto: [{
    id: Date.now() + Math.random(),
    producto: {
      id: 1,
      nombre: "Camiseta Oversize Negra",
      stock: 8,
      precio: 7999,
      idCategoria: 1,
      descripcion: "Camiseta oversize negra de algodón premium.",
      idTalleProducto: 1,
      color: "Negro",
      imgs: [
        {
          id: 101,
          idProducto: 1,
          url: imgEjemplo,
          principal: true,
        },
      ],
      descuento:0,
    },
    cantidad: 1,
    idOrdenDeCompra: 0,
  },
{
    id: Date.now() + Math.random(),
    producto: {
     id: 22,
      nombre: "Buzo Hoodie Gris Minimalista",
      stock: 3,
      precio: 15499,
      idCategoria: 2,
      descripcion: "Buzo gris claro con diseño minimalista.",
      idTalleProducto: 2,
      color: "Gris",
      imgs: [
        {
          id: 102,
          idProducto: 2,
          url: imgEjemplo,
          principal: true,
        },
      ],
      descuento:0,
    },
    cantidad: 1,
    idOrdenDeCompra: 0,
  }],
  activeProducto: null,
>>>>>>> 44a7e372b06a005ee36e0ea676aa7d5516dda2d5

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
