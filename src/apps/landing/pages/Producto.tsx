import { useEffect, useState } from "react";
import { ArticleGallery } from "../components/articleGallery/ArticleGallery";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from "../styles/Producto.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProductoStore } from "../../../store/slices/ProductoStore";
import { useCarritoStore } from "../../../store/slices/CarritoStore";
import { ProductCartView } from "../components/cart/ProductCartView";
import { AnimatePresence, motion } from "framer-motion";
import { IProducto } from "../../../types/IProducto";
import { IProductoTalle } from "../../../types/IProductoTalle";

export const Producto = () => {
  const activeDetalle = useCarritoStore((state) => state.activeProductoDetalle);
  const productId = useParams().productId || "";
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<IProductoTalle | null>(null);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [cantidad, setCantidad] = useState<number>(1);
  const [showAdedToCart, setShowAddToCart] = useState<boolean>(false);
  const [productoStock, setProductoStock] = useState<number>(0);
  const [producto, setproducto] = useState<IProducto | null>(null);

  const handleMinus = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };
  const handleAdd = () => {
    if (selectedSize)
      if (cantidad < selectedSize.stock) setCantidad(cantidad + 1);
  };

  const handleSelectSize = (prodTalle: IProductoTalle) => {
    setSelectedSize(prodTalle);
    setProductoStock(prodTalle.stock);
    setCantidad(1);
  };

  const addToCart = () => {
    if (selectedSize) {
      // Verificamos si el producto ya esta en el carrito
      const isInCart = useCarritoStore
        .getState()
        .detallesProducto.find(
          (detalle) => detalle.productotalle.id === selectedSize.id
        );
      if (isInCart) {
        useCarritoStore
          .getState()
          .addCantidad(isInCart.id.toString(), cantidad);
        const result = useCarritoStore
          .getState()
          .getDetalleById(isInCart.id.toString());
        result && useCarritoStore.getState().setActiveProductoDetalle(result);
        setSizeError(false);
        setShowAddToCart(true);
      } else {
        /*
        const newDetalle: IDetalleOrden = {
          id: Date.now() + Math.random(),
          productotalle: selectedSize,
          cantidad: cantidad,
        };
        if (producto && selectedSize) {
          useCarritoStore.getState().addProductoDetalle(newDetalle);
          useCarritoStore.getState().setActiveProductoDetalle(newDetalle);
          setSizeError(false);
          setShowAddToCart(true);
        }*/
      }
    } else {
      setSizeError(true);
    }
  };

  useEffect(() => {
    setSelectedSize(null); // reiniciar selección
    setCantidad(1); // reiniciar cantidad
    
    document.title = `${producto?.nombre || "Error"} - Thrill`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);
  return (
    <div>
      {/* Header */}
      <Header />

      {producto ? (
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
                <img src={producto.imagenes[0].url} alt="Remera" />
                <img src={producto.imagenes[0].url} alt="Remera" />
                <img src={producto.imagenes[0].url} alt="Remera" />
              </div>
              <img
                className={styles.imgContainer}
                src={producto.imagenes[0].url}
                alt="Remera"
              />
            </div>
            <div className={styles.productInfo}>
              <div>
                <h2>{producto.nombre}</h2>
                <p className={styles.descripcion}>{producto.descripcion}</p>

                <p className={styles.precio}>${producto.precio}</p>
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
                      {producto.productoTalles.map((prodTalle) => (
                        <button
                          key={prodTalle.talle.talle}
                          onClick={() => handleSelectSize(prodTalle)}
                          className={
                            selectedSize === prodTalle ? styles.selected : ""
                          }
                        >
                          {prodTalle.talle.talle}
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
              activeDetalle &&
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
                    <ProductCartView detalleOrden={activeDetalle} />
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
          {/* Error Producto */}
          <div style={{ textAlign: "center" }}>
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
        productos={useProductoStore((state) => state.productos)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};
