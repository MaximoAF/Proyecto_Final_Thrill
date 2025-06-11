import { IDetalleOrden } from "../../types/IDetalleOrden";

export interface ICarritoState {
  detallesProducto: IDetalleOrden[];
  activeProductoDetalle: IDetalleOrden | null;

  setActiveProductoDetalle: (prdocuto: IDetalleOrden) => void;
  clearActiveProductoDetalle: () => void;

  addProductoDetalle: (detalle: IDetalleOrden) => void;
  removeProductoDetalle: (detalleId: string) => void;
  addCantidad: (detalleId: string, cantidad: number) => void;
  discountCantidad: (detalleId: string, cantidad: number) => void;

  getDetalleById: (detalleId: string) => IDetalleOrden | undefined;
}
