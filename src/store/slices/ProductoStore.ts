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
