import { FC, useEffect, useState } from "react";
import styles from "../../styles/articleGallery/ArticleGallery.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IProducto } from "../../../../types/IProducto";
import loadingIcon from "../../../../assets/Loading_icon.gif";

interface IArticleGalleryProps {
  title: string;
  productos: IProducto[];
}

export const ArticleGallery: FC<IArticleGalleryProps> = ({
  title,
  productos,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<IProducto[]>([]);
  const navigate = useNavigate();

  const handleShow = () => {
    if (showAll) {
      setFiltered(productos.slice(0, 4));
    } else {
      setFiltered(productos);
    }
    setShowAll(!showAll);
  };

  useEffect(() => {
    setFiltered(showAll ? productos : productos.slice(0, 4));
  }, [productos, showAll]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title.toUpperCase()}</h2>
      {productos.length < 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            style={{ height: "20rem", width: "30rem" }}
            src={loadingIcon}
            alt="loading..."
          />
        </div>
      )}
      <div className={styles.articleGrid}>
        <AnimatePresence>
          {/* Productos */}
          {filtered.map((prod) => (
            <motion.div
              className={styles.card}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'tween', stiffness: 300 }}
              key={prod.id}
              onClick={() => {
                navigate(`/p/${prod.id}`);
              }}
            >
              <div className={styles.imgContainer}>
                {prod.imagenes.length > 0 ? (
                  <img src={prod.imagenes[0].url} alt="imagen" />
                ) : (
                  <i className="fa-solid fa-image"></i>
                )}
              </div>
              <p className={styles.articleTitle}>{prod.nombre}</p>
              <p className={styles.articlePrice}>
                ${prod.precio.toLocaleString("es-AR")}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="button-container">
        <button className="button-white" onClick={() => handleShow()}>
          {showAll ? "Ver menos" : "Ver todo"}
        </button>
      </div>
    </div>
  );
};
