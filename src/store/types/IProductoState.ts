import { IProducto } from "../../types/IProducto";

export interface IProductoState {
  productos: IProducto[];
  activeProducto: IProducto | null;

  loadProducts: () => Promise<void>;

  setActiveProducto: (producto: IProducto) => void;
  clearActiveProducto: () => void;

  addProducto: (producto: IProducto) => void;
  removeProducto: (productoId: string) => void;
  getProductoById: (productoId: string) => IProducto | undefined;
  updateProducto: (producto: IProducto) => void;
}
