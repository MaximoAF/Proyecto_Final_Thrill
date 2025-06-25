import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCategoriaStore } from "../../../store/slices/CategoriaStore";
import { ErrorPage } from "./ErrorPage";
import styles from "../styles/Categoria.module.css";
import loadingIcon from "../../../assets/Loading_icon.gif";
import { AnimatePresence, motion } from "framer-motion";
import { useProductoStore } from "../../../store/slices/ProductoStore";
import { useTalleStore } from "../../../store/slices/TalleStore";
import { ICategoria } from "../../../types/ICategoria";

export const Categoria = () => {
  const categoriaName = useParams().categoriaName || "";
  const categorias = useCategoriaStore((state) => state.categorias);
  const productos = useProductoStore((state) => state.productos);
  const talles = useTalleStore((state) => state.talles);

  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<ICategoria | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [categoriasFiltered, setCategoriasFiltered] = useState<ICategoria[]>(
    categorias.slice(0, 5)
  );

  // Filtros
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const handleShowCategorias = () => {
    if (categoria) {
      if (categorias === categoriasFiltered) {
        setCategoriasFiltered(categorias.slice(0, 5));
      } else {
        setCategoriasFiltered(categorias);
      }
    }
  };

  useEffect(() => {
    const fetchCategoria = async () => {
      await useCategoriaStore.getState().loadCategoria();
      await useProductoStore.getState().loadProducts();
      const res = useCategoriaStore
        .getState()
        .getCategoriaByName(categoriaName);
      if (res) {
        setCategoria(res);
        document.title = `${res.nombre} - Thrill`;
      } else {
        setCategoria(null);
        document.title = `Categoria no encontrada - Thrill`;
      }
      setIsLoadingPage(false);
    };
    fetchCategoria();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    setCategoriasFiltered(categorias.slice(0, 5));
  }, [categorias]);
  return (
    <>
      {isLoadingPage || categoria ? (
        <div>
          <Header />
          <div className={styles.container}>
            {/* Ruta */}
            <p style={{ color: "var(--black-60)" }}>
              <Link to="/" style={{ color: "var(--black-60)" }}>
                Home{" "}
              </Link>
              <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
              <span style={{ color: "var(--black-color)" }}>
                {categoria?.nombre}
              </span>
            </p>
            <div className={styles.gridContent}>
              {/* Filtros */}
              <div>
                <div className={styles.filtros}>
                  <div className="flex-between">
                    <p className="bold-24px">Filtros</p>
                    <i
                      style={{ color: "var(--black-40)", fontSize: "1.5rem" }}
                      className="fa-solid fa-sliders"
                    ></i>
                  </div>
                  <div className="separator"></div>
                  <div className={styles.tipos}>
                    <div>
                      <AnimatePresence>
                        {isLoadingPage ? (
                          <motion.div>
                            <img src={loadingIcon} alt="loading..." />
                          </motion.div>
                        ) : (
                          categoriasFiltered.map((cat) => (
                            <motion.div
                              key={cat.id}
                              initial={{
                                marginBottom: 0,
                                height: 0,
                                opacity: 0,
                                x: -20,
                              }}
                              exit={{
                                marginBottom: 0,
                                height: 0,
                                opacity: 0,
                                x: 20,
                              }}
                              animate={{
                                marginBottom: "1.5rem",
                                height: "auto",
                                opacity: 1,
                                x: 0,
                              }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring" }}
                              className="flex-between"
                              style={{ cursor: "pointer" }}
                              onClick={() => navigate(`/c/${cat.nombre}`)}
                            >
                              <p>{cat.nombre}</p>
                              <i className="fa-solid fa-chevron-right"></i>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </div>
                    <button
                      onClick={() => handleShowCategorias()}
                      className="button-white"
                      style={{ margin: "0 auto" }}
                    >
                      {categorias === categoriasFiltered
                        ? "Mostrar menos"
                        : "Mostrar mas"}
                    </button>
                  </div>
                  <div className="separator"></div>
                  <div className={styles.price}>
                    <div className="flex-between">
                      <p className="bold-24px">Precio</p>
                      <i
                        style={{ fontSize: "1.5rem" }}
                        className="fa-solid fa-chevron-up"
                      ></i>
                    </div>
                    <div className={styles.range}>
                      <input type="number" placeholder="min - $$$" />
                      <i className="fa-solid fa-minus"></i>
                      <input type="number" placeholder="max - $$$" />
                    </div>
                  </div>
                  <div className="separator"></div>
                  <div className={styles.talle}>
                    <div className="flex-between">
                      <p className="bold-24px">Talle</p>
                      <i
                        style={{ fontSize: "1.5rem" }}
                        className="fa-solid fa-chevron-up"
                      ></i>
                    </div>
                    <div className={styles.tallesContainer}>
                      <button
                        style={{ width: "auto", padding: "0 1.5rem" }}
                        className="button-white"
                      >
                        Extra Small / XS
                      </button>
                      <button
                        style={{ width: "auto", padding: "0 1.5rem" }}
                        className="button-black"
                      >
                        Small / S
                      </button>
                      <button
                        style={{ width: "auto", padding: "0 1.5rem" }}
                        className="button-white"
                      >
                        Medium / M
                      </button>
                      <button
                        style={{ width: "auto", padding: "0 1.5rem" }}
                        className="button-white"
                      >
                        Large / L
                      </button>
                      <button
                        style={{ width: "auto", padding: "0 1.5rem" }}
                        className="button-white"
                      >
                        Extra Large / XL
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Main */}
              <div className={styles.main}>
                <div className="flex-between">
                  <p className="bold-32px">{categoria?.nombre}</p>
                  <div className={styles.ordenarSelect}>
                    <p>Ordenar por:</p>
                    <select className={styles.button} name="header_buttons">
                      <option value="Mas relevante" selected>
                        Más relevante
                      </option>
                      <option value="Menor precio">Menor precio</option>
                      <option value="Mayor precio">Mayor precio</option>
                    </select>
                  </div>
                </div>
                
                  {/* Productos */}
                  <AnimatePresence mode="wait">
                    {isLoadingPage ? (
                      <motion.div
                        key="loader"
                        initial={{marginTop: "0rem", opacity: 0 }}
                        animate={{marginTop: "10rem", opacity: 1 }}
                        exit={{marginTop: "0rem", opacity: 0 }}
                        style={{width: "100%", display: 'flex', justifyContent: 'center'}}
                      >
                        <img src={loadingIcon} alt="loading..." />
                      </motion.div>
                    ) : (
                      <div className={styles.productsGrid}>

                        {productos.map((prod) => (
                          <motion.div
                            key={prod.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => {
                              navigate(`/p/${prod.id}`);
                            }}
                          >
                            <div className={styles.imgContainer}>
                              {prod.imagenes.length > 0 ? (
                                <img src={prod.imagenes[0]?.url} alt="imagen" />
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
                      </div>
                    )}
                  </AnimatePresence>

              </div>
            </div>
          </div>

          <Footer />
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
