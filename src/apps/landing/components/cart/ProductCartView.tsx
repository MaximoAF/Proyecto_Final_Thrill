import { FC } from "react";
import styles from "../../styles/cart/ProductCart.module.css";
import { IDetalleOrden } from "../../../../types/IDetalleOrden";

interface IProductCartViewProps {
  detalleOrden: IDetalleOrden;
}

export const ProductCartView: FC<IProductCartViewProps> = ({
  detalleOrden,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          {detalleOrden.productoTalle.producto.imagenes.length > 0 ? (
            <img
            style={{borderRadius: '1.2rem'}}
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
            <p>
              Cantidad:{" "}
              <span className={styles.gray}>{detalleOrden.cantidad}</span>
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
    </div>
  );
};
