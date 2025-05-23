import { FC, useState } from "react";
import { IProducto } from "../../../../types/IProducto";
import styles from "../../styles/articleGallery/ArticleGallery.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface IArticleGalleryProps {
  title: string;
  articles: IProducto[];
}

export const ArticleGallery: FC<IArticleGalleryProps> = ({
  title,
  articles,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<IProducto[]>(articles.slice(0, 4));

  const handleShow = () => {
    if (showAll) {
      setFiltered(articles.slice(0, 4));
    } else {
      setFiltered(articles);
    }
    setShowAll(!showAll);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title.toUpperCase()}</h2>
      <div className={styles.articleGrid}>
        <AnimatePresence>
          {/* Articulos */}
          {filtered.map((art) => (
            <motion.div
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.imgContainer}>
                {art.imgs.length > 0 ? (
                  <img src={art.imgs[0]?.url} alt="imagen" />
                ) : (
                  <i className="fa-solid fa-image"></i>
                )}
              </div>
              <p className={styles.articleTitle}>{art.nombre}</p>
              <p className={styles.articlePrice}>
                ${art.precio.toLocaleString("es-AR")}
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
