import { create } from "zustand";
import { IProductoState } from "../types/IProductoState";
import imgEjemplo from "../../assets/imgs/remeraEj.png";
import imgEjemplo2 from "../../assets/imgs/imageEj2.png";
import { IProducto } from "../../types/IProducto";
import { IProductoAgrupado } from "../../types/IProductoAgrupado";

export const productosEjemplo:IProducto[] = [
    {
      id: Date.now()+Math.random(),
      nombre: "Camiseta Oversize Negra",
      precio: 7999,
      idCategoria: 1,
      descripcion: "Camiseta oversize negra de algodón premium.",
      talleProducto: "S",
      stock: 6,
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
    {
      id: Date.now()+Math.random(),
      nombre: "Camiseta Oversize Negra",
      precio: 7999,
      idCategoria: 1,
      descripcion: "Camiseta oversize negra de algodón premium.",
      talleProducto: "M",
      stock: 4,
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
    {
      id: Date.now()+Math.random(),
      nombre: "Camiseta Oversize Negra",
      precio: 7999,
      idCategoria: 1,
      descripcion: "Camiseta oversize negra de algodón premium.",
      talleProducto: "L",
      stock: 10,
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
    {
      id: Date.now()+Math.random(),
      nombre: "Camiseta Oversize Negra",
      precio: 7999,
      idCategoria: 1,
      descripcion: "Camiseta oversize negra de algodón premium.",
      talleProducto: "XL",
      stock: 8,
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
    {
      id: Date.now()+Math.random(),
      nombre: "Buzo Hoodie Gris Minimalista",
      precio: 15499,
      idCategoria: 2,
      descripcion: "Buzo gris claro con diseño minimalista.",
      talleProducto: "S",
      stock: 5,
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
    {
      id: Date.now()+Math.random(),
      nombre: "Buzo Hoodie Gris Minimalista",
      precio: 15499,
      idCategoria: 2,
      descripcion: "Buzo gris claro con diseño minimalista.",
      talleProducto: "M",
      stock: 11,
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
    {
      id: Date.now()+Math.random(),
      nombre: "Buzo Hoodie Gris Minimalista",
      precio: 15499,
      idCategoria: 2,
      descripcion: "Buzo gris claro con diseño minimalista.",
      talleProducto: "L",
      stock: 9,
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
    {
      id: Date.now()+Math.random(),
      nombre: "Buzo Hoodie Gris Minimalista",
      precio: 15499,
      idCategoria: 2,
      descripcion: "Buzo gris claro con diseño minimalista.",
      talleProducto: "XL",
      stock: 6,
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
    {
      id: Date.now()+Math.random(),
      nombre: "Pantalón Cargo Verde Militar",
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      talleProducto: "S",
      stock: 8,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: Date.now()+Math.random(),
      nombre: "Pantalón Cargo Verde Militar",
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      talleProducto: "M",
      stock: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: Date.now()+Math.random(),
      nombre: "Pantalón Cargo Verde Militar",
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      talleProducto: "L",
      stock: 5,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: Date.now()+Math.random(),
      nombre: "Pantalón Cargo Verde Militar",
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      talleProducto: "XL",
      stock: 7,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: Date.now()+Math.random(),
      nombre: "Remera Básica Blanca",
      precio: 21999,
      idCategoria: 3,
      descripcion: "Remera básica blanca de algodón orgánico.",
      talleProducto: "S",
      stock: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: Date.now()+Math.random(),
      nombre: "Remera Básica Blanca",
      precio: 21999,
      idCategoria: 6,
      descripcion: "Remera básica blanca de algodón orgánico.",
      talleProducto: "M",
      stock: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: Date.now()+Math.random(),
      nombre: "Remera Básica Blanca",
      precio: 21999,
      idCategoria: 3,
      descripcion: "Remera básica blanca de algodón orgánico.",
      talleProducto: "L",
      stock: 5,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: Date.now()+Math.random(),
      nombre: "Remera Básica Blanca",
      precio: 21999,
      idCategoria: 8,
      descripcion: "Remera básica blanca de algodón orgánico.",
      talleProducto: "XL",
      stock: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    
  ]
  const agruparProductosPorNombre = (productos: IProducto[]): IProductoAgrupado[] => {
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
          color: prod.color
      });
    } else {
      existente.talleStock.push(variante);
    }
  });

  return agrupados;
};
export const useProductoStore = create<IProductoState>((set, get) => ({
  productos: [...productosEjemplo],
  productosAgrupados: agruparProductosPorNombre(productosEjemplo),
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
