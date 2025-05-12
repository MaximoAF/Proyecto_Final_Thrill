import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from "../styles/Cart.module.css";
import { ProductCart } from "../components/cart/ProductCart";
import { articulosDB } from "../../../data/db";

export const Cart = () => {
  const articulosEJ = articulosDB.slice(0, 5);
  const total = articulosEJ.reduce((sum, art) => sum + art.precio, 0);
  const discount = 0.1;
  const envioPrice = 7500;
  const sumTotal = total - Math.round(total * discount) + envioPrice;

  return (
    <div className="flex-page">
      <Header />

      <div className={styles.content}>
        <p className={styles.ruta}>
          Home <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
          <span style={{ color: "var(--black-color)" }}>Tu carrito</span>
        </p>
        <h2 className={styles.title}>Tu carrito</h2>
        <div className={styles.grid}>
          <div className={styles.products}>
            {articulosEJ.map((art, i) => (
              <div className={styles.separatorGap}>
                {i !== 0 && <div className="separator" />} {/* Separador */}
                <ProductCart product={art} />
              </div>
            ))}
          </div>
          <div>
            {/* Seccion de Orden */}
            <div className={styles.order}>
              {/* Titulo */}
              <div>
                <p className="bold-24px">Orden de pago</p>
              </div>
              {/* Valores */}
              <div className={styles.orderValues}>
                <div className={styles.itemValue}>
                  <p>Subtotal</p>
                  <span className="bold">${total}</span>
                </div>
                <div className={styles.itemValue}>
                  <p>Descuento(-{discount * 100}%)</p>
                  <span className="bold-red">
                    -${Math.round(total * discount)}
                  </span>
                </div>
                <div className={styles.itemValue}>
                  <p>Envio</p>
                  <span className="bold">${envioPrice}</span>
                </div>
                <div className="separator"></div>
                <div className={styles.totalValue}>
                  <p>Total</p>
                  <span className="bold">${sumTotal}</span>
                </div>
              </div>
              {/* Button de cupón */}
              <div className={styles.cuponContainer}>
                <div style={{ flexGrow: "1" }} className="input-white">
                  <div className={styles.tagContainer}>
                    <i className="fa-solid fa-tag"></i>
                  </div>
                  <input type="text" placeholder="Codigo promocional" />
                </div>
                <button className="button-black">Aplicar</button>
              </div>
              {/* Button de compra */}
              <div>
                <button style={{ width: "100%" }} className="button-black">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
