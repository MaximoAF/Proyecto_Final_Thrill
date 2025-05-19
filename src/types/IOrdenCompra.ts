export interface IOrdenCompra {
  id: number;
  idDireccionUsuario: number;
  idDetalle: number;
  fecha: string;
  cantidad: number;
  precioTotal: number;
  metodoPago: 'EFECTIVO' | 'DEBITO' | 'CREDITO' | 'TRANSFERENCIA';
  estado: string;
}
