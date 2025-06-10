import { IDetalleCompra } from "../../types/IDetalleCompra";

export interface ICarritoState {
  detallesProducto: IDetalleCompra[];
  activeProductoDetalle: IDetalleCompra | null;

  setActiveProductoDetalle: (prdocuto: IDetalleCompra) => void;
  clearActiveProductoDetalle: () => void;

  addProductoDetalle: (detalle: IDetalleCompra) => void;
  removeProductoDetalle: (detalleId: string) => void;
  addCantidad: (detalleId: string, cantidad: number) => void;
  discountCantidad: (detalleId: string, cantidad: number) => void;

  getDetalleById: (detalleId: string) => IDetalleCompra | undefined
}
