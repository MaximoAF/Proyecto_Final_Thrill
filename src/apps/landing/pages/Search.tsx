import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { IProducto } from "../../../types/IProducto";
import { useCategoriaStore } from "../../../store/slices/CategoriaStore";
import { ICategoria } from "../../../types/ICategoria";
import { Header } from "../components/Header";
import styles from "../styles/Search.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Footer } from "../components/Footer";
import { ErrorPage } from "./ErrorPage";
import loadingIcon from "../../../assets/Loading_icon.gif";
import { productoService } from "../../../services/productoService";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  // ejemplo: filtrar productos
  const [productos, setProductos] = useState<IProducto[]>([]);

  const categorias = useCategoriaStore((state) => state.categorias);
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<ICategoria | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [categoriasFiltered, setCategoriasFiltered] = useState<ICategoria[]>(
    categorias.slice(0, 5)
  );

  // Filtros
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [aplicarFiltro, setAplicarFiltro] = useState(false);

  const productosFiltrados = useMemo(() => {
    return productos.filter((prod) => {

      const enCategoria = prod.categorias.some((cat) =>
        categoria ? cat.id === categoria.id : prod
      );
      const dentroDeRango =
        (!minPrice || prod.precio >= minPrice) &&
        (!maxPrice || prod.precio <= maxPrice);
      return enCategoria && dentroDeRango;
    });
  }, [productos, categoria, aplicarFiltro]);

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
    const fetchBusqueda = async () => {
      await useCategoriaStore.getState().loadCategoria();
      const res = await productoService.buscarPorNombre(query);
      if (res) {
        setProductos(res);
        document.title = `${query} - Thrill`;
      } else {
        setCategoria(null);
        document.title = `Categoria no encontrada - Thrill`;
      }
      setIsLoadingPage(false);
    };
    fetchBusqueda();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [query]);

  useEffect(() => {
    setCategoriasFiltered(categorias.slice(0, 5));
  }, [categorias]);

  return (
    <>
      {isLoadingPage || productos ? (
        <div>
          <Header />
          <div className={styles.container}>
            <p style={{ color: "var(--black-60)" }}>
              <Link to="/" style={{ color: "var(--black-60)" }}>
                Home{" "}
              </Link>
              <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
              <span style={{ color: "var(--black-color)" }}>Search </span>
              <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
              <span style={{ color: "var(--black-color)" }}>{query}</span>
            </p>

            <div className={styles.gridContent}>
              {/* Filtros */}
              <div>
                <div className={styles.filtros}>
                  <div className="flex-between">
                    <p className="bold-24px">Filtros</p>
                    <i
                      className="fa-solid fa-sliders"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </div>

                  <div className="separator"></div>

                  {/* <Categorías> */}
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
                              onClick={() => setCategoria(cat)}
                            >
                              <p>{cat.nombre}</p>
                              <i className="fa-solid fa-chevron-right"></i>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </div>
                    <button
                      onClick={handleShowCategorias}
                      className="button-white"
                      style={{ margin: "0 auto" }}
                    >
                      {categorias === categoriasFiltered
                        ? "Mostrar menos"
                        : "Mostrar más"}
                    </button>
                  </div>

                  <div className="separator"></div>

                  {/* Precio */}
                  <div className={styles.price}>
                    <div className="flex-between">
                      <p className="bold-24px">Precio</p>
                      <i
                        className="fa-solid fa-chevron-up"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                    </div>
                    <div className={styles.range}>
                      <input
                        type="number"
                        placeholder="min - $$$"
                        value={minPrice}
                        onChange={(e) =>
                          setMinPrice(Number(e.target.value) || "")
                        }
                      />
                      <i className="fa-solid fa-minus"></i>
                      <input
                        type="number"
                        placeholder="max - $$$"
                        value={maxPrice}
                        onChange={(e) =>
                          setMaxPrice(Number(e.target.value) || "")
                        }
                      />
                    </div>
                  </div>

                  <div className="separator"></div>

                  {/* Talles (no funcional por ahora) */}
                  <div className={styles.talle}>
                    <div className="flex-between">
                      <p className="bold-24px">Talles</p>
                      <i
                        className="fa-solid fa-chevron-up"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                    </div>
                    <p>{"(Ropa)"}</p>
                    <div className={styles.tallesContainer}>
                      {["XS", "S", "M", "L", "XL", "XXL", "Unico"].map((t) => (
                        <button
                          key={t}
                          className="button-white"
                          style={{ width: "auto", padding: "0 1.5rem" }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="separator"></div>
                    <p>{"(Zapatillas)"}</p>
                    <div className={styles.tallesContainer}>
                      {["38", "39", "40", "41", "42", "43", "44"].map((t) => (
                        <button
                          key={t}
                          className="button-white"
                          style={{ width: "auto", padding: "0 1.5rem" }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="separator"></div>
                    <p>{"(Pantalones)"}</p>
                    <div className={styles.tallesContainer}>
                      {["38", "40", "42", "44", "46", "48", "50", "52"].map(
                        (t) => (
                          <button
                            key={t}
                            className="button-white"
                            style={{ width: "auto", padding: "0 1.5rem" }}
                          >
                            {t}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="separator"></div>

                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <button
                      onClick={() => {
                        setMinPrice("");
                        setMaxPrice("");
                        setCategoria(null);
                        setAplicarFiltro((p) => !p);
                      }}
                      style={{ width: "100%" }}
                      className="button-black"
                    >
                      Limpiar
                    </button>
                    <button
                      onClick={() => setAplicarFiltro((p) => !p)}
                      style={{ width: "100%" }}
                      className="button-black"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>

              {/* Productos */}
              <div className={styles.main}>
                <div className="flex-between">
                  <p className="bold-32px">{query}</p>
                  <div className={styles.ordenarSelect}>
                    <p>Ordenar por:</p>
                    <select className={styles.button}>
                      <option defaultChecked>Más relevante</option>
                      <option value="Menor precio">Menor precio</option>
                      <option value="Mayor precio">Mayor precio</option>
                    </select>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isLoadingPage ? (
                    <motion.div
                      key="loader"
                      initial={{ marginTop: "0rem", opacity: 0 }}
                      animate={{ marginTop: "10rem", opacity: 1 }}
                      exit={{ marginTop: "0rem", opacity: 0 }}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img src={loadingIcon} alt="loading..." />
                    </motion.div>
                  ) : (
                    <div className={styles.productsGrid}>
                      {productosFiltrados.map((prod) => (
                        <motion.div
                          key={prod.id}
                          className={styles.card}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          onClick={() => navigate(`/p/${prod.id}`)}
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
