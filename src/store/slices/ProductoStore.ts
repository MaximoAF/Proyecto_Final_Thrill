import { create } from "zustand";
import { IProductoState } from "../types/IProductoState";
import { IProducto, productosEjemplo } from "../../types/IProducto";
import { IProductoAgrupado } from "../../types/IProductoAgrupado";

const agruparProductosPorNombre = (
  productos: IProducto[]
): IProductoAgrupado[] => {
  const agrupados: IProductoAgrupado[] = [];

  productos.forEach((prod) => {
    const existente = agrupados.find((p) => p.nombre === prod.nombre);
    const variante = {
      talle: prod.talleProducto,
      stock: prod.stock,
      idProducto: prod.id,
    };

    if (!existente) {
      agrupados.push({
        id: prod.id,
        imgs: prod.imgs,
        nombre: prod.nombre,
        precio: prod.precio,
        idCategoria: prod.idCategoria,
        descripcion: prod.descripcion,
        talleStock: [variante],
        color: prod.color,
      });
    } else {
      existente.talleStock.push(variante);
    }
  });

  return agrupados;
};
export const useProductoStore = create<IProductoState>((set, get) => ({
<<<<<<< HEAD
  productos: [...productosEjemplo],
  productosAgrupados: agruparProductosPorNombre(productosEjemplo),
=======
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
>>>>>>> 44a7e372b06a005ee36e0ea676aa7d5516dda2d5
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
