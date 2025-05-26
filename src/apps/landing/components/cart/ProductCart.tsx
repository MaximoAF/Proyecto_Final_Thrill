import { FC } from "react";
import styles from "../../styles/cart/ProductCart.module.css";
import { IDetalleCompra } from "../../../../types/IDetalleCompra";
import { useCarritoStore } from "../../../../store/slices/CarritoStore";

interface IProductCartProps {
  detalleCompra: IDetalleCompra;
}

export const ProductCart: FC<IProductCartProps> = ({ detalleCompra }) => {
  const handleMinus = () => {
    if (detalleCompra.cantidad > 1) {
      useCarritoStore.getState().discountCantidad(detalleCompra.id.toString());
    }
  };
  const handleAdd = () => {
    if (detalleCompra.producto)
      if (detalleCompra.cantidad < detalleCompra.producto.stock)
        useCarritoStore.getState().addCantidad(detalleCompra.id.toString());
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <img src={detalleCompra.producto.imgs[0]?.url} alt="" />
        </div>
        <div className={styles.valorContainer}>
          <div>
            <p className={styles.title}>{detalleCompra.producto.nombre}</p>
            <p>
              Color: <span className={styles.gray}>{detalleCompra.producto.color}</span>
            </p>
            <p>
              Size: <span className={styles.gray}>{detalleCompra.producto.idTalleProducto}</span>
            </p>
          </div>
          <p className={styles.price}>
            $
            {(
              detalleCompra.producto.precio * detalleCompra.cantidad
            ).toLocaleString("es-AR")}
          </p>
        </div>
      </div>
      <div className={styles.buttonsFlex}>
        <div className={styles.trashButton}>
          <div className="i-btn" onClick={() => useCarritoStore.getState().removeProducto(detalleCompra.id.toString())}>
            <i className="fa-regular fa-trash-can"></i>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          {detalleCompra.producto.stock - detalleCompra.cantidad < 6 && (
            <p style={{ color: "var(--red-color)", textAlign: "center" }}>
              {detalleCompra.producto.stock - detalleCompra.cantidad === 0
                ? `No hay mas en stock!`
                : `${
                    detalleCompra.producto.stock - detalleCompra.cantidad
                  } mas en stock`}
            </p>
          )}
          <div className={styles.cuantity}>
            <div
              className={detalleCompra.cantidad > 1 ? "i-btn" : "i-btn-disable"}
              onClick={() => handleMinus()}
            >
              <i className="fa-solid fa-minus"></i>
            </div>
            <p>
              <b>{detalleCompra.cantidad}</b>
            </p>
            <div
              className={
                detalleCompra.cantidad < detalleCompra.producto.stock
                  ? "i-btn"
                  : "i-btn-disable"
              }
              onClick={() => handleAdd()}
            >
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
