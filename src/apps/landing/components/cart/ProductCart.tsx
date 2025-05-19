import { FC, useState } from "react";
import { IProducto } from "../../../../types/IProducto";
import styles from "../../styles/cart/ProductCart.module.css";

interface IProductCartProps {
  product: IProducto;
}

export const ProductCart: FC<IProductCartProps> = ({ product }) => {
  const [cantidad, setCantidad] = useState<number>(1);
  const handleMinus = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };
  const handleAdd = () => {
    if (cantidad < product.stock) setCantidad(cantidad + 1);
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <img src={product.imgs[0]?.url} alt="" />
        </div>
        <div className={styles.valorContainer}>
          <div>
            <p className={styles.title}>{product.nombre}</p>
            <p>
              Color: <span className={styles.gray}>color</span>
            </p>
            <p>
              Size: <span className={styles.gray}>L</span>
            </p>
          </div>
          <p className={styles.price}>
            ${(product.precio * cantidad).toLocaleString("es-AR")}
          </p>
        </div>
      </div>
      <div className={styles.buttonsFlex}>
        <div className={styles.trashButton}>
          <div className="i-btn">
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
          {product.stock - cantidad < 6 && (
            <p style={{ color: "var(--red-color)", textAlign: "center" }}>
              {product.stock - cantidad === 0
                ? `No hay mas en stock!`
                : `${product.stock - cantidad} mas en stock`}
            </p>
          )}
          <div className={styles.cuantity}>
            <div
              className={cantidad > 1 ? "i-btn" : "i-btn-disable"}
              onClick={() => handleMinus()}
            >
              <i className="fa-solid fa-minus"></i>
            </div>
            <p>
              <b>{cantidad}</b>
            </p>
            <div
              className={cantidad < product.stock ? "i-btn" : "i-btn-disable"}
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
