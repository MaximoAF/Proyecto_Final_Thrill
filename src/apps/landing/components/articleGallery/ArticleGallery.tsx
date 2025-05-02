import { FC, useState } from "react";
import { IArticulo } from "../../../../types/IArticulo";
import styles from "../../styles/articleGallery/ArticleGallery.module.css";

interface IArticleGalleryProps {
  title: string;
  articles: IArticulo[];
}

export const ArticleGallery: FC<IArticleGalleryProps> = ({
  title,
  articles,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<IArticulo[]>(articles.slice(0, 4));

  const handleShow = () => {
    if (showAll) {
      setFiltered(articles.slice(0, 4));
      setShowAll(!showAll);
    } else {
      setFiltered(articles);
      setShowAll(!showAll);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title.toUpperCase()}</h2>
      <div className={styles.articleGrid}>
        {/* Articulos */}
        {filtered.map((art) => (
          <div className={styles.card}>
            <div className={styles.imgContainer}>
              {art.imgs.length > 0 ? (
                <img src={art.imgs[0]} alt="imagen" />
              ) : (
                <i className="fa-solid fa-image"></i>
              )}
            </div>
            <p className={styles.articleTitle}>{art.titulo}</p>
            <p className={styles.articlePrice}>
              ${art.precio.toLocaleString("es-AR")}
            </p>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="button-white" onClick={() => handleShow()}>
          {showAll ? "Ver menos" : "Ver todo"}
        </button>
      </div>
    </div>
  );
};
