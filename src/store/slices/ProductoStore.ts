import { create } from "zustand";
import { IProductoState } from "../types/IProductoState";
import imgEjemplo from "../../assets/imgs/remeraEj.png";
import imgEjemplo2 from "../../assets/imgs/imageEj2.png";

export const useProductoStore = create<IProductoState>((set, get) => ({
  productos: [
    {
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
    {
      id: 2,
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
    {
      id: 3,
      nombre: "Pantalón Cargo Verde Militar",
      stock: 9,
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      idTalleProducto: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo,
          principal: true,
        },
      ],
      descuento:0,
    },
    {
      id: 21,
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
          url: imgEjemplo2,
          principal: true,
        },
      ],
      descuento:0,
    },
    {
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
    {
      id: 23,
      nombre: "Pantalón Cargo Verde Militar",
      stock: 9,
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      idTalleProducto: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo,
          principal: true,
        },
      ],
      descuento:0,
    },
    {
      id: 31,
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
    {
      id: 32,
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
    {
      id: 33,
      nombre: "Pantalón Cargo Verde Militar",
      stock: 9,
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      idTalleProducto: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo,
          principal: true,
        },
      ],
      descuento:0,
    },
    {
      id: 41,
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
    {
      id: 42,
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
    {
      id: 43,
      nombre: "Pantalón Cargo Verde Militar",
      stock: 9,
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      idTalleProducto: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo,
          principal: true,
        },
      ],
      descuento:0,
    },
  ],
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

  getProductoById: (productoId) => {
    return get().productos.find((p) => p.id.toString() === productoId);
  },
  updateProducto: (producto) =>
    set((state) => ({
      productos: state.productos.map((p) =>
        p.id.toString() === producto.id.toString() ? { ...p, ...producto } : p
      ),
    })),
}));
