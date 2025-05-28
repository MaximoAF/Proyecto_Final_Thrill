import { useEffect, useState } from "react";
import { ArticleGallery } from "../components/articleGallery/ArticleGallery";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from "../styles/Producto.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProductoStore } from "../../../store/slices/ProductoStore";
import { useCarritoStore } from "../../../store/slices/CarritoStore";
import { IDetalleCompra } from "../../../types/IDetalleCompra";
import { ProductCartView } from "../components/cart/ProductCartView";
import { AnimatePresence, motion } from "framer-motion";
import { ITalleStockAgrupado } from "../../../types/ITalleStockAgrupado";
import { IProducto } from "../../../types/IProducto";

export const Producto = () => {
  const productId = useParams().productId || "";
  const navigate = useNavigate();
  const productoAgrupado = useProductoStore
    .getState()
    .productosAgrupados.find((prod) => prod.id.toString() === productId);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [cantidad, setCantidad] = useState<number>(1);
  const [showAdedToCart, setShowAddToCart] = useState<boolean>(false);
  const [productoStock, setProductoStock] = useState<number>(0);
  const [producto, setproducto] = useState<IProducto | null>(null);

  const handleMinus = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };
  const handleAdd = () => {
    if (producto) if (cantidad < producto.stock) setCantidad(cantidad + 1);
  };

  const handleSelectSize = (variante: ITalleStockAgrupado) => {
    setSelectedSize(variante.talle);
    if (productoAgrupado) {
      setProductoStock(variante.stock);
      setproducto(
        useProductoStore
          .getState()
          .getProductoById(variante.idProducto.toString()) || null
      );
      setCantidad(1)
    }
  };

  const addToCart = () => {
    if (producto) {
      const newDetalle: IDetalleCompra = {
        id: Date.now() + Math.random(),
        producto: producto,
        cantidad: cantidad,
        idOrdenDeCompra: 0,
      };
      if (producto && selectedSize) {
        useCarritoStore.getState().addProductoDetalle(newDetalle);
        useCarritoStore.getState().setActiveProductoDetalle(newDetalle);
        setSizeError(false);
        setShowAddToCart(true);
        console.log(
          `Producto agregado al carrito: ${producto.nombre}, Cantidad: ${cantidad}, Talle: ${selectedSize}`
        );
      }
    } else {
      setSizeError(true);
    }
  };

  useEffect(() => {
    setSelectedSize(""); // reiniciar selección
    setCantidad(1); // reiniciar cantidad
    document.title = `${productoAgrupado?.nombre} - Thrill`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);
  return (
    <div>
      {/* Header */}
      <Header />

      {productoAgrupado ? (
        <div className={styles.container}>
          {/* Ruta */}
          <p style={{ color: "var(--black-60)" }}>
            <Link to="/" style={{ color: "var(--black-60)" }}>
              Home{" "}
            </Link>
            <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
            <Link to="/" style={{ color: "var(--black-60)" }}>
              Hombre{" "}
            </Link>
            <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
            <span style={{ color: "var(--black-color)" }}>Remera</span>
          </p>
          {/* Contenido principal */}
          <div className={styles.gridProducto}>
            <div className={styles.imgGrid}>
              <div className={styles.imgsGallery}>
                <img src={productoAgrupado.imgs[0].url} alt="Remera" />
                <img src={productoAgrupado.imgs[0].url} alt="Remera" />
                <img src={productoAgrupado.imgs[0].url} alt="Remera" />
              </div>
              <img
                className={styles.imgContainer}
                src={productoAgrupado.imgs[0].url}
                alt="Remera"
              />
            </div>
            <div className={styles.productInfo}>
              <div>
                <h2>{productoAgrupado.nombre}</h2>
                <p className={styles.descripcion}>
                  {productoAgrupado.descripcion}
                </p>

                <p className={styles.precio}>${productoAgrupado.precio}</p>
              </div>
              <div className={styles.buttonsContainer}>
                <div>
                  <p style={{ color: "var(--black-60)" }}>
                    Seleccionar el talle
                  </p>
                  <div className={styles.containerButton}>
                    <div
                      className={`${styles.buttonsSize} ${
                        sizeError && !selectedSize ? styles.errorSize : ""
                      }`}
                    >
                      {productoAgrupado.talleStock.map((agrup) => (
                        <button
                          key={agrup.talle}
                          onClick={() => handleSelectSize(agrup)}
                          className={
                            selectedSize === agrup.talle ? styles.selected : ""
                          }
                        >
                          {agrup.talle}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Separador */}
                <div style={{ margin: "0 0" }}>
                  <div className="separator"></div>
                </div>

                <div className={styles.buttonsAction}>
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
                      className={
                        cantidad < productoStock ? "i-btn" : "i-btn-disable"
                      }
                      onClick={() => handleAdd()}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </div>
                  </div>
                  <button
                    style={{ flexGrow: "1" }}
                    className="button-black"
                    onClick={() => addToCart()}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Mensaje de agregado al carrito */}
          <AnimatePresence>
            {showAdedToCart &&
              useCarritoStore.getState().activeProductoDetalle && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "keyframes", stiffness: 300 }}
                  className="overlay"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "keyframes", stiffness: 300 }}
                    className={styles.addedToCart}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ fontSize: "1.5rem" }}>
                        <b>Carrito</b>
                      </p>

                      <button
                        className="i-btn"
                        onClick={() => {
                          setShowAddToCart(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <i className="fa-solid fa-x fa-lg"></i>
                      </button>
                    </div>
                    {/* Separador */}
                    <div className="separator"></div>

                    <ProductCartView
                      detalleCompra={
                        useCarritoStore.getState().activeProductoDetalle ||
                        useCarritoStore.getState().detallesProducto[0]
                      }
                    />
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <button
                        style={{ marginTop: "3rem", flexGrow: "1" }}
                        className="button-black"
                        onClick={() => navigate("/carrito")}
                      >
                        Ir al carrito
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
          </AnimatePresence>
        </div>
      ) : (
        <div className={styles.errorContainer}>
          <div>
            <h2>Producto no encontrado</h2>
            <p>Lo sentimos, el producto que buscas no existe.</p>
          </div>

          <button
            className="button-black"
            onClick={() => window.history.back()}
          >
            Volver a la tienda
          </button>
        </div>
      )}
      {/* Separador */}
      <div style={{ margin: "5rem 0" }}>
        <div className="separator"></div>
      </div>

      {/* Podria interesarte */}
      <ArticleGallery
        title="Esto podría interesarte"
        articles={useProductoStore((state) => state.productosAgrupados)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};
