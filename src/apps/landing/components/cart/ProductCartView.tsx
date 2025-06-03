import { FC } from "react";
import styles from "../../styles/cart/ProductCart.module.css";
import { IDetalleCompra } from "../../../../types/IDetalleCompra";

interface IProductCartViewProps {
  detalleCompra: IDetalleCompra;
}

export const ProductCartView: FC<IProductCartViewProps> = ({ detalleCompra }) => {
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
              Size: <span className={styles.gray}>{detalleCompra.producto.talleProducto}</span>
            </p>
            <p>
              Cantidad: <span className={styles.gray}>{detalleCompra.cantidad}</span>
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
    </div>
  );
};
