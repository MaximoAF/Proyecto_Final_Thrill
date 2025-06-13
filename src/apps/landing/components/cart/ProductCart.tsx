import { FC } from "react";
import styles from "../../styles/cart/ProductCart.module.css";
import { useCarritoStore } from "../../../../store/slices/CarritoStore";
import { IDetalleOrden } from "../../../../types/IDetalleOrden";

interface IProductCartProps {
  detalleOrden: IDetalleOrden;
}

export const ProductCart: FC<IProductCartProps> = ({ detalleOrden }) => {
  const handleMinus = () => {
    if (detalleOrden.cantidad > 1) {
      useCarritoStore
        .getState()
        .discountCantidad(detalleOrden.id.toString(), 1);
    }
  };
  const handleAdd = () => {
    if (detalleOrden.productotalle)
      if (detalleOrden.cantidad < detalleOrden.productotalle.stock)
        useCarritoStore.getState().addCantidad(detalleOrden.id.toString(), 1);
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <img src={detalleOrden.productotalle.producto.imagenes[0]?.url} alt="" />
        </div>
        <div className={styles.valorContainer}>
          <div>
            <p className={styles.title}>{detalleOrden.productotalle.producto.nombre}</p>
            <p>
              Color:{" "}
              <span className={styles.gray}>
                {detalleOrden.productotalle.producto.color}
              </span>
            </p>
            <p>
              Size:{" "}
              <span className={styles.gray}>
                {detalleOrden.productotalle.talle.talle}
              </span>
            </p>
          </div>
          <p className={styles.price}>
            $
            {(
              detalleOrden.productotalle.producto.precio * detalleOrden.cantidad
            ).toLocaleString("es-AR")}
          </p>
        </div>
      </div>
      <div className={styles.buttonsFlex}>
        <div className={styles.trashButton}>
          <div
            className="i-btn"
            onClick={() =>
              useCarritoStore
                .getState()
                .removeProductoDetalle(detalleOrden.id.toString())
            }
          >
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
          {detalleOrden.productotalle.stock - detalleOrden.cantidad < 6 && (
            <p style={{ color: "var(--red-color)", textAlign: "center" }}>
              {detalleOrden.productotalle.stock - detalleOrden.cantidad === 0
                ? `No hay mas en stock!`
                : `${
                    detalleOrden.productotalle.stock - detalleOrden.cantidad
                  } mas en stock`}
            </p>
          )}
          <div className={styles.cuantity}>
            <div
              className={detalleOrden.cantidad > 1 ? "i-btn" : "i-btn-disable"}
              onClick={() => handleMinus()}
            >
              <i className="fa-solid fa-minus"></i>
            </div>
            <p>
              <b>{detalleOrden.cantidad}</b>
            </p>
            <div
              className={
                detalleOrden.cantidad < detalleOrden.productotalle.stock
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
