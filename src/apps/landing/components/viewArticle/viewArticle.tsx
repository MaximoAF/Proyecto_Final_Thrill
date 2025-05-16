import styles from "../../styles/viewArticle/viewArticle.module.css";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { articulosDB } from "../../../../data/db";
import { useState } from "react";
import { ArticleGallery } from "../articleGallery/ArticleGallery";
import { Link } from "react-router-dom";

export const ViewArticle = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const product = articulosDB[0]
  return (
    <div>
      <Header/>
      <div className={styles.container}>
        {/* Ruta */}
            <p>
              <Link to="/">Home</Link>
              <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
              <span style={{ color: 'var(--black-60)' }}>Producto</span>
            </p>
        {/* Contenido principal */}
        <div className={styles.gridProducto}>
          <div className={styles.imgGrid}>
            <div className={styles.imgsGallery}>
              <img src={product.imgs[0]} alt="Remera" />
              <img src={product.imgs[0]} alt="Remera" />
              <img src={product.imgs[0]} alt="Remera" />
            </div>
            <img className={styles.imgContainer} src={product.imgs[0]} alt="Remera" />
          </div>
          <div className={styles.product}>
            <div>
              <h1>Título</h1>
              <h4>Precio: $95000</h4>
            </div>
            <div className={styles.sizeSelect}>
            <h4>Seleccionar el talle</h4>
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
            <div className={styles.containerButton}>
              <button className="button-black">comprar</button>
              <button className="button-black">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
      <ArticleGallery title="Esto podría interesarte" articles={[product]} />
      <Footer/>
    </div>
  );
};
