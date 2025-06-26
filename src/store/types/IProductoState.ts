import { IProducto } from "../../types/IProducto";

export interface IProductoState {
  productos: IProducto[];
  activeProducto: IProducto | null;

  loadProducts: () => Promise<void>;

  setActiveProducto: (producto: IProducto | null) => void;
  clearActiveProducto: () => void;

  addProducto: (producto: IProducto) => void;
  removeProducto: (productoId: string | number) => void;
  getProductoById: (productoId: string | number) => IProducto | undefined;
  updateProducto: (producto: IProducto) => void;
}
