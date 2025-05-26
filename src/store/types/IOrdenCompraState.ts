import { IOrdenCompra } from "../../types/IOrdenCompra";

export interface IOrdenCompraState {
  ordenes: IOrdenCompra[];
  activeOrden: IOrdenCompra | null;

  setActiveOrden: (orden: IOrdenCompra) => void;
  clearActiveOrden: () => void;

  addOrden: (orden: IOrdenCompra) => void;
  removeOrden: (ordentId: string) => void;
  updateOrden: (orden: IOrdenCompra) => void;
}