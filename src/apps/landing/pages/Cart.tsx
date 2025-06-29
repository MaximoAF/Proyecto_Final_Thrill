import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from "../styles/Cart.module.css";
import loadingIcon from "../../../assets/Loading_icon.gif";
import { ProductCart } from "../components/cart/ProductCart";
import { useCarritoStore } from "../../../store/slices/CarritoStore";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSesionStore } from "../../../store/slices/SesionStore";
import { crearPago } from "../../../services/ordencompraService";
import { usuarioService } from "../../../services/usuarioService";
import { MessageCompra } from "../components/cart/MessageCompra";
import { IDireccion } from "../../../types/IDireccion";

export interface IOrdenNueva {
  usuario: {
    id: number;
  };
  direccion: {
    id: number;
  };
  detalles: {
    productoTalle: {
      id: number;
    };
    cantidad: number;
    precio: number;
  }[];
}

export const Cart = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message")?.toLowerCase() || "";

  const detalles = useCarritoStore((state) => state.detallesProducto);
  const sesion = useSesionStore((state) => state.sesion);
  const setSesion = useSesionStore((state) => state.setSesion);
  const clearCarrito = useCarritoStore((state) => state.clearCarrito);

  const [codigoPromocional, setCodigoPromocional] = useState<string>("");
  const [comprandoLoading, setComprandoLoading] = useState<boolean>(false);
  const [showMessageCompra, setShowMessageCompra] = useState<boolean>(false);
  const [showSelectDir, setShowSelectDir] = useState<boolean>(false);
  const [selectedDir, setSelectedDir] = useState<IDireccion | null>(null);
  const [messageCompra, setMessageCompra] = useState<string>("");
  const [messageMp, setMessageMp] = useState<string>(message);
  const [discount, setDiscount] = useState<number>(0.0);

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
      setEnvioPrecio(0);
    }
  };

  // Mensaje de accion de compra
  const handleMessgeComprar = (message: string) => {
    setShowMessageCompra(true);
    setMessageCompra(message);
  };

  const handleComprar = async () => {
    setComprandoLoading(true);
    if (sesion && detalles) {
      if (sesion.direcciones.length > 0) {
        if (selectedDir) {
          const jsonNewOrden: IOrdenNueva = {
            usuario: { id: sesion.id },
            direccion: { id: selectedDir.id },
            detalles: [],
          };

          // Agregar envio

          detalles.map((detalle) =>
            jsonNewOrden.detalles.push({
              productoTalle: { id: detalle.productotalle.id },
              cantidad: detalle.cantidad,
              precio: detalle.productotalle.producto.precio,
            })
          );

          try {
            const { orden: ordenCreada, init_point } = await crearPago(
              jsonNewOrden
            );
            console.log("Orden creada:", ordenCreada);
            try {
              const usuarioRes = await usuarioService.getById(sesion.id);
              setSesion(usuarioRes);
              setShowSelectDir(false);
            } catch (error: any) {
              console.log("Error en inicio de sesión");
            }
            window.location.href = init_point;
          } catch (error) {
            console.error("Error al crear el pago:", error);
          }
        } else {
          // Se necesita seleccionar direccion
          setShowSelectDir(true);
        }
      } else {
        // Se necesita una direccion
        handleMessgeComprar("Se necesita una direccion");
      }
    } else {
      // Se necesita iniciar sesion
      handleMessgeComprar("Se necesita iniciar sesion");
    }
    setComprandoLoading(false);
  };

  useEffect(() => {
    document.title = "Tu carrito - Thrill";
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (message) clearCarrito();
    setComprandoLoading(false);
  }, []);
  useEffect(() => {
    if (detalles.length < 1 || total >= 155000) {
      setEnvioPrecio(0);
    } else {
      setEnvioPrecio(7500);
    }
  }, [total]);

  return (
    <div className="flex-page">
      <Header />

      {/* Main content */}
      <div className={styles.content}>
        {/* Link ruta */}
        <p style={{ color: "var(--black-60)" }}>
          <Link to="/" style={{ color: "var(--black-60)" }}>
            Home{" "}
          </Link>{" "}
          <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
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
                    {detalles.length > 0 && envioPrice === 0
                      ? "Envio Gratis"
                      : `$${envioPrice.toLocaleString("es-AR")}`}
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
                <button
                  onClick={() => handleComprar()}
                  style={{ width: "100%" }}
                  className="button-black"
                >
                  {comprandoLoading ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        style={{
                          position: "absolute",
                          top: "-1.9rem",
                          width: "10rem",
                        }}
                        src={loadingIcon}
                        alt="loading..."
                      />
                    </div>
                  ) : (
                    "Comprar"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mensaje de compra */}
      <AnimatePresence>
        {showMessageCompra && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "tween", stiffness: 300 }}
            className="overlay"
          >
            {/* Componente de mensaje compra */}
            <MessageCompra
              onClose={() => setShowMessageCompra(false)}
              message={messageCompra}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mensaje de MP */}
      <AnimatePresence>
        {messageMp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "tween", stiffness: 300 }}
            className="overlay"
          >
            {/* Componente de mensaje compra */}
            <MessageCompra
              onClose={() => setMessageMp("")}
              message={messageMp}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Select direccion */}
      <AnimatePresence>
        {showSelectDir && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "tween", stiffness: 300 }}
            className="overlay"
          >
            {/* Seleccione una direccion */}
            <div className={styles.selectDirection}>
              <div className={styles.selectDirectionContent}>
                <p style={{ fontSize: "1.5rem" }}>
                  <b>Seleccione una direccion:</b>
                </p>

                <button
                  className="i-btn"
                  onClick={() => setShowSelectDir(false)}
                >
                  <i className="fa-solid fa-x fa-lg"></i>
                </button>
              </div>
              {/* Separador */}
              <div className="separator"></div>

              {sesion &&
                sesion.direcciones.map((dir, i) => (
                  <>
                    {/* Separador */}
                    {i > 0 && <div className="separator" />}
                    <motion.div
                      key={dir.id}
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      transition={{ type: "tween", stiffness: 300 }}
                      className={styles.spaceBetweenDirection}
                    >
                      <div>
                        <p className="bold">{`Direccion ${dir.calle}`}</p>
                        <p>
                          Localidad:{" "}
                          <span className={styles.gray}>{dir.localidad}</span>
                        </p>
                        <p>
                          Calle:{" "}
                          <span className={styles.gray}>{dir.calle}</span>
                        </p>
                        <p>
                          Codigo postal:{" "}
                          <span className={styles.gray}>{dir.codpostal}</span>
                        </p>
                      </div>
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ type: "tween", stiffness: 300 }}
                          className={styles.iconContainer}
                        >
                          {dir === selectedDir ? (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ type: "tween", stiffness: 300 }}
                            >
                              <i className="fa-regular fa-circle-check"></i>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ type: "tween", stiffness: 300 }}
                            >
                              <i
                                className="fa-regular fa-circle i-btn"
                                onClick={() => {
                                  setSelectedDir(dir);
                                }}
                              ></i>
                            </motion.div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </>
                ))}

              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  style={{ marginTop: "3rem", flexGrow: "1" }}
                  className="button-black"
                  onClick={() => handleComprar()}
                >
                  Comenzar pago
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};
