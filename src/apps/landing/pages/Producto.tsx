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
import { productoService } from "../../../services/productoService";
import loadingIcon from "../../../assets/Loading_icon.gif";
import { IDetalleOrden } from "../../../types/IDetalleOrden";

export const Producto = () => {
  const activeDetalle = useCarritoStore((state) => state.activeProductoDetalle);
  const productos = useProductoStore((state) => state.productos);
  const productId = useParams().productId || "";
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<IProductoTalle | null>(null);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [cantidad, setCantidad] = useState<number>(1);
  const [showAdedToCart, setShowAddToCart] = useState<boolean>(false);
  const [productoStock, setProductoStock] = useState<number>(0);
  const [producto, setProducto] = useState<IProducto | null>(null);

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
        const newDetalle: IDetalleOrden = {
          id: Date.now() + Math.random(),
          productotalle: selectedSize,
          cantidad: cantidad,
          precio: cantidad * selectedSize.producto.precio,
          eliminado: false
        };
        if (producto && selectedSize) {
          useCarritoStore.getState().addProductoDetalle(newDetalle);
          useCarritoStore.getState().setActiveProductoDetalle(newDetalle);
          setSizeError(false);
          setShowAddToCart(true);
        }
      }
    } else {
      setSizeError(true);
    }
  };

  useEffect(() => {
    const fetchProducto = async () => {
      setSelectedSize(null);
      setCantidad(1);

      await useProductoStore.getState().loadProducts();

      const res = await productoService.getById(Number(productId));
      if (res) {
        setProducto(res);
        document.title = `${res.nombre} - Thrill`;
      } else {
        setProducto(null);
        document.title = `Producto no encontrado - Thrill`;
      }

      setIsLoading(false);
    };
    fetchProducto();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);
  return (
    <div>
      {/* Header */}
      <Header />
      <div>
        {isLoading ? (
          <div className={styles.errorContainer}>
            {/* Loading */}
            <div>
              <img src={loadingIcon} alt="loading..." />
            </div>
          </div>
        ) : producto ? (
          <>
            <div className={styles.container}>
              {/* Ruta */}
              <p style={{ color: "var(--black-60)" }}>
                <Link to="/" style={{ color: "var(--black-60)" }}>
                  Home{" "}
                </Link>
                {producto.tipo && (
                  <>
                    <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
                    <Link to="/" style={{ color: "var(--black-60)" }}>
                      {producto.tipo.nombre}{" "}
                    </Link>
                  </>
                )}
                <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
                <span style={{ color: "var(--black-color)" }}>
                  {producto.nombre}
                </span>
              </p>
              {/* Contenido principal */}
              <div className={styles.gridProducto}>
                {/* Imagenes */}
                <div className={styles.imgGrid}>
                  <div className={styles.imgsGallery}>
                    {producto.imagenes.length > 0 ? (
                      <img src={producto.imagenes[0].url} alt="Imagen" />
                    ) : (
                      <div className={styles.noImgContainerSide}>
                        <i className="fa-solid fa-image"></i>
                      </div>
                    )}
                    {producto.imagenes.length > 1 ? (
                      <img src={producto.imagenes[1].url} alt="Imagen" />
                    ) : (
                      <div className={styles.noImgContainerSide}>
                        <i className="fa-solid fa-image"></i>
                      </div>
                    )}
                    {producto.imagenes.length > 2 ? (
                      <img src={producto.imagenes[2].url} alt="Imagen" />
                    ) : (
                      <div className={styles.noImgContainerSide}>
                        <i className="fa-solid fa-image"></i>
                      </div>
                    )}
                  </div>
                  {producto.imagenes.length > 0 ? (
                    <img
                      className={styles.imgContainer}
                      src={producto.imagenes[0].url}
                      alt="Imagen"
                    />
                  ) : (
                    <div className={styles.noImgContainer}>
                      <i className="fa-solid fa-image"></i>
                    </div>
                  )}
                </div>

                {/* Info */}
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
                          {producto.productoTalles
                            .sort((a, b) =>
                              a.talle.talle.localeCompare(
                                b.talle.talle,
                                undefined,
                                { numeric: true }
                              )
                            )
                            .map((prodTalle) => (
                              <button
                                key={prodTalle.talle.talle}
                                onClick={() => handleSelectSize(prodTalle)}
                                className={
                                  selectedSize === prodTalle
                                    ? styles.selected
                                    : ""
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
          </>
        ) : (
          <div className={styles.errorContainer}>
            {/* Error producto */}
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
      </div>

      {/* Separador */}
      <div style={{ margin: "5rem 0" }}>
        <div className="separator"></div>
      </div>

      {/* Podria interesarte */}
      <ArticleGallery title="Esto podría interesarte" productos={productos} />

      {/* Footer */}
      <Footer />
    </div>
  );
};
