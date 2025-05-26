import { create } from "zustand";
import { ICarritoState } from "../types/ICarritoState";

import imgEjemplo from "../../assets/imgs/remeraEj.png";

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
    },
    cantidad: 1,
    idOrdenDeCompra: 0,
  }],
  activeProducto: null,

  setActiveProducto: (producto) => set({ activeProducto: producto }),
  clearActiveProducto: () => set({ activeProducto: null }),

  addProducto: (producto) => {
    set((state) => ({
      detallesProducto: [
        ...state.detallesProducto,
        {
          id: Date.now(),
          producto: producto,
          cantidad: 1,
          idOrdenDeCompra: 0,
        },
      ],
    }));
  },
  removeProducto: (productoId) => {
    set((state) => ({
      detallesProducto: state.detallesProducto.filter(
        (producto) => String(producto.id) !== String(productoId)
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
