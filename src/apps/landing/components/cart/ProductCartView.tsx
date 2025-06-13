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
            <p>
              Cantidad:{" "}
              <span className={styles.gray}>{detalleOrden.cantidad}</span>
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
    </div>
  );
};
