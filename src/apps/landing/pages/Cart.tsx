import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from "../styles/Cart.module.css";
import { ProductCart } from "../components/cart/ProductCart";
import { useCarritoStore } from "../../../store/slices/CarritoStore";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSesionStore } from "../../../store/slices/SesionStore";

export const Cart = () => {
  const navigate = useNavigate();
  const detalles = useCarritoStore((state) => state.detallesProducto);
  const [codigoPromocional, setCodigoPromocional] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0.0);
  const sesion = useSesionStore((state)=>state.sesion)

  const total = detalles.reduce(
    (sum, detalle) =>
      sum + detalle.productotalle.producto.precio * detalle.cantidad,
    0
  );
  const [envioPrice, setEnvioPrecio] = useState<number>(7500);
  const sumTotal = total - Math.round(total * discount) + envioPrice;

  const handleCodigoPromocional = (codigo: string) => {
    if (codigo === "TryFreeMP") {
      setDiscount(1);
      setEnvioPrecio(0)
    }
  };

  const handleComprar = ()=>{
    if(sesion) {
      if(sesion.direcciones.length>0){
        
      }else{navigate('/ingreso')}
    }else{navigate('/ingreso')}

  }

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
            <AnimatePresence mode="wait">
              {detalles.length > 0 ? (
                detalles.map((detalle, i) => (
                  <motion.div
                    key={detalle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "tween", stiffness: 300 }}
                    className={styles.separatorGap}
                  >
                    {i !== 0 && <div className="separator" />} {/* Separador */}
                    <ProductCart detalleOrden={detalle} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "tween", stiffness: 300 }}
                  className={styles.separatorGap}
                >
                  <div className={styles.emptyCart}>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                      }}
                    >
                      El carrito está vacio
                    </p>
                    <button
                      className="button-black"
                      onClick={() => navigate("/")}
                    >
                      Ir a comprar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                  <span className="bold">
                    ${envioPrice.toLocaleString("es-AR")}
                  </span>
                </div>
                <div className="separator"></div>
                <div className={styles.totalValue}>
                  <p>Total</p>
                  <span className="bold">
                    ${sumTotal.toLocaleString("es-AR")}
                  </span>
                </div>
              </div>
              {/* Button de cupón */}
              <div className={styles.cuponContainer}>
                <div style={{ flexGrow: "1" }} className="input-white">
                  <div className={styles.tagContainer}>
                    <i className="fa-solid fa-tag"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Codigo promocional"
                    value={codigoPromocional}
                    onChange={(e) => setCodigoPromocional(e.target.value)}
                  />
                </div>
                <button
                  className="button-black"
                  onClick={() => handleCodigoPromocional(codigoPromocional)}
                >
                  Aplicar
                </button>
              </div>
              {/* Button de compra */}
              <div>
                <button onClick={()=>handleComprar()} style={{ width: "100%" }} className="button-black">
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
