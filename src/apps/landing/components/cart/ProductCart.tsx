import { FC } from "react";
import styles from "../../styles/cart/ProductCart.module.css";
import { useCarritoStore } from "../../../../store/slices/CarritoStore";
import { IDetalleOrden } from "../../../../types/IDetalleOrden";
import { useNavigate } from "react-router-dom";

interface IProductCartProps {
  detalleOrden: IDetalleOrden;
}

export const ProductCart: FC<IProductCartProps> = ({ detalleOrden }) => {
  const navigate = useNavigate();

  const handleMinus = () => {
    if (detalleOrden.cantidad > 1) {
      useCarritoStore
        .getState()
        .discountCantidad(detalleOrden.id.toString(), 1);
    }
  };
  const handleAdd = () => {
    if (detalleOrden.productoTalle)
      if (detalleOrden.cantidad < detalleOrden.productoTalle.stock)
        useCarritoStore.getState().addCantidad(detalleOrden.id.toString(), 1);
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div
          className={styles.imgContainer}
          onClick={() =>
            navigate(`/p/${detalleOrden.productoTalle.producto.id}`)
          }
        >
          {detalleOrden.productoTalle.producto.imagenes.length > 0 ? (
            <img
              style={{ borderRadius: "1.2rem" }}
              src={detalleOrden.productoTalle.producto.imagenes[0]?.url}
              alt="image"
            />
          ) : (
            <i className="fa-solid fa-image"></i>
          )}
        </div>
        <div className={styles.valorContainer}>
          <div>
            <p className={styles.title}>
              {detalleOrden.productoTalle.producto.nombre}
            </p>
            <p>
              Color:{" "}
              <span className={styles.gray}>
                {detalleOrden.productoTalle.producto.color}
              </span>
            </p>
            <p>
              Size:{" "}
              <span className={styles.gray}>
                {detalleOrden.productoTalle.talle.talle}
              </span>
            </p>
          </div>
          <p className={styles.price}>
            $
            {(
              detalleOrden.productoTalle.producto.precio * detalleOrden.cantidad
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
            <i style={{fontSize: '1.5rem'}} className="fa-regular fa-trash-can"></i>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          {detalleOrden.productoTalle.stock - detalleOrden.cantidad < 6 && (
            <p style={{ color: "var(--red-color)", textAlign: "center" }}>
              {detalleOrden.productoTalle.stock - detalleOrden.cantidad === 0
                ? `No hay mas en stock!`
                : `${
                    detalleOrden.productoTalle.stock - detalleOrden.cantidad
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
                detalleOrden.cantidad < detalleOrden.productoTalle.stock
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
