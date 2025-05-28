import { IProducto } from "../../types/IProducto";
import { IProductoAgrupado } from "../../types/IProductoAgrupado";


export interface IProductoState {
  productos: IProducto[];
  productosAgrupados: IProductoAgrupado[];
  activeProducto: IProducto | null;

  setActiveProducto: (producto: IProducto) => void;
  clearActiveProducto: () => void;

  addProducto: (producto: IProducto) => void;
  removeProducto: (productoId: string) => void;
  getProductoById: (productoId: string) => IProducto | undefined;
  updateProducto: (producto: IProducto) => void;
}