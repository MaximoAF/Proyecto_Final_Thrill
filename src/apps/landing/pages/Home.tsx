import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import bannerImg from "../../../assets/imgs/banner.png";
import styles from "../styles/Home.module.css";
import { ArticleGallery } from "../components/articleGallery/ArticleGallery";
import { CategoriesGrid } from "../components/CategoriesGrid";
import { useProductoStore } from "../../../store/slices/ProductoStore";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    document.title = `Thrill`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Header />

      {/* Banner */}
      <div
        style={{ backgroundImage: `url(${bannerImg})` }}
        className={styles.banner}
      >
        <div className={styles.bannerInfo}>
          <div className={styles.infoContainer}>
            <h2 style={{ fontSize: "4rem" }}>
              EL ESTILO QUE TE GUSTA EN UN SOLO LUGAR
            </h2>
            <p style={{ color: "var(--black-60)" }}>
              Explora todo lo que tenemos para ofrecerte y resaltar tu estilo,
              marcar quien eres y como te ves.
            </p>
            <button
              className="button-black"
              onClick={() => {
                document
                  .getElementById("separator")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ir a comprar
            </button>
          </div>
        </div>
      </div>

      {/* Separador Rectangular */}
      <div className={styles.rectangleSeparator}>
        <p>Envío gratis a partir de $155.000</p>
      </div>

      {/* Gallery */}
      <ArticleGallery
        title="Nuevos Ingresos"
        articles={useProductoStore((state) => state.productosAgrupados)}
      />

      {/* Separador */}
      <div id="separator" style={{ margin: "3rem 0" }}>
        <div className="separator"></div>
      </div>

      {/* Gallery */}
      <ArticleGallery
        title="Lo mas vendidos"
        articles={useProductoStore((state) => state.productosAgrupados)}
      />

      {/* Categorias */}
      <CategoriesGrid />

      <Footer />
    </div>
  );
};
