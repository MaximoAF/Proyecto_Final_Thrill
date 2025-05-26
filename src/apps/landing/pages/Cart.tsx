import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from "../styles/Cart.module.css";
import { ProductCart } from "../components/cart/ProductCart";
import { useCarritoStore } from "../../../store/slices/CarritoStore";
import { useEffect } from "react";

export const Cart = () => {
  const detalles = useCarritoStore((state) => state.detallesProducto);
  const total = detalles.reduce(
    (sum, detalle) => sum + detalle.producto.precio * detalle.cantidad,
    0
  );
  const discount = 0.1;
  const envioPrice = 7500;
  const sumTotal = total - Math.round(total * discount) + envioPrice;

  useEffect(() => {
    document.title = "Tu carrito - Thrill";
  }, []);

  return (
    <div className="flex-page">
      <Header />

      <div className={styles.content}>
        <p style={{ color: "var(--black-60)" }}>
          Home <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
          <span style={{ color: "var(--black-color)" }}>Tu carrito</span>
        </p>
        <h2 className={styles.title}>Tu carrito</h2>
        <div className={styles.grid}>
          <div className={styles.products}>
            {useCarritoStore((state) => state.detallesProducto).map(
              (detalle, i) => (
                <div className={styles.separatorGap}>
                  {i !== 0 && <div className="separator" />} {/* Separador */}
                  <ProductCart detalleCompra={detalle} />
                </div>
              )
            )}
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
                  <span className="bold">${total.toLocaleString("es-AR")}</span>
                </div>
                <div className={styles.itemValue}>
                  <p>Descuento(-{discount * 100}%)</p>
                  <span className="bold-red">
                    -${Math.round(total * discount).toLocaleString("es-AR")}
                  </span>
                </div>
                <div className={styles.itemValue}>
                  <p>Envio</p>
                  <span className="bold">${envioPrice.toLocaleString("es-AR")}</span>
                </div>
                <div className="separator"></div>
                <div className={styles.totalValue}>
                  <p>Total</p>
                  <span className="bold">${sumTotal.toLocaleString("es-AR")}</span>
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
