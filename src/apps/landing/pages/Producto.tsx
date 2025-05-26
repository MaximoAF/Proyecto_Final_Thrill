import { useEffect, useState } from "react";
import { ArticleGallery } from "../components/articleGallery/ArticleGallery";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from "../styles/Producto.module.css";
import { Link, useParams } from "react-router-dom";
import { IProducto } from "../../../types/IProducto";
import { useProductoStore } from "../../../store/slices/ProductoStore";

export const Producto = () => {
  const productId = useParams().productId || "";
  const product = useProductoStore((state) => state.getProductoById(productId));
  
  const [selectedSize, setSelectedSize] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const handleMinus = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };
  const handleAdd = () => {
    if (product) if (cantidad < product.stock) setCantidad(cantidad + 1);
  };

  useEffect(() => {
    setSelectedSize(""); // reiniciar selección
    setCantidad(1); // reiniciar cantidad
    document.title = `${product?.nombre} - Thrill`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);
  return (
    <div>
      {/* Header */}
      <Header />

      {product ? (
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
                <img src={product.imgs[0].url} alt="Remera" />
                <img src={product.imgs[0].url} alt="Remera" />
                <img src={product.imgs[0].url} alt="Remera" />
              </div>
              <img
                className={styles.imgContainer}
                src={product.imgs[0].url}
                alt="Remera"
              />
            </div>
            <div className={styles.productInfo}>
              <div>
                <h2>{product.nombre}</h2>
                <p className={styles.descripcion}>{product.descripcion}</p>

                <p className={styles.precio}>${product.precio}</p>
              </div>
              <div className={styles.buttonsContainer}>
                <div>
                  <p style={{ color: "var(--black-60)" }}>
                    Seleccionar el talle
                  </p>
                  <div className={styles.buttonsSize}>
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={selectedSize === size ? styles.selected : ""}
                      >
                        {size}
                      </button>
                    ))}
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
                        cantidad < product.stock ? "i-btn" : "i-btn-disable"
                      }
                      onClick={() => handleAdd()}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </div>
                  </div>
                  <button style={{ flexGrow: "1" }} className="button-black">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
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
      <ArticleGallery title="Esto podría interesarte" articles={useProductoStore((state)=>state.productos)} />

      {/* Footer */}
      <Footer />
    </div>
  );
};
