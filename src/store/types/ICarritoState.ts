import { IDetalleCompra } from "../../types/IDetalleCompra";
import { IProducto } from "../../types/IProducto";

export interface ICarritoState {
  detallesProducto: IDetalleCompra[];
  activeProducto: IDetalleCompra | null;

  setActiveProducto: (prdocuto: IDetalleCompra) => void;
  clearActiveProducto: () => void;

  addProducto: (producto: IProducto) => void;
  removeProducto: (ordentId: string) => void;
  addCantidad: (ordenId: string) => void;
  discountCantidad: (ordenId: string) => void;
}
