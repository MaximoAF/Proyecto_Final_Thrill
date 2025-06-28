import styles from "../styles/Header.module.css";
import thrillLogoBlack from "../../../assets/svg/thrill_logo-dark.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCategoriaStore } from "../../../store/slices/CategoriaStore";

export const Header = () => {
  const navigate = useNavigate();
  const [oferClosed, setOferClosed] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const categorias = useCategoriaStore((state) => state.categorias);
  const loadCategorias = useCategoriaStore((state) => state.loadCategoria);

  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    loadCategorias();
  }, []);
  return (
    <div>
      <AnimatePresence>
        {!oferClosed && (
          <motion.div
            className={styles.sale}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>Hasta 30% OFF en seleccionados</p>
            <button
              className={styles.close}
              onClick={() => setOferClosed(true)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.navBar}>
        <div className={styles.imgContainer} onClick={() => navigate("/")}>
          <img src={thrillLogoBlack} alt="Thrill" />
        </div>

        <div className={styles.navButtons}>
          <select
            className={styles.button}
            name="header_buttons"
            defaultValue="Categorias"
            onChange={(e) => {
              const value = e.target.value;
              if (value !== "Categorias") navigate(`/c/${value.toLowerCase()}`);
            }}
          >
            <option key={"selected"} value="Categorias">
              Categorias
            </option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
          <button className={styles.button}>Promociones</button>
          <button className={styles.button}>Outfits</button>
          <button className={styles.button}>Nuevo</button>
        </div>

        <div className={styles.buscador}>
          <i onClick={() => navigate(`/serch?query=${searchTerm}`)} className="fa-solid fa-magnifying-glass"></i>
          <input
            className={styles.inputBuscador}
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/serch?query=${searchTerm}`);
              }
            }}
          />
        </div>

        <div className={styles.icons}>
          <button className="i-btn" onClick={() => navigate("/carrito")}>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <button className="i-btn" onClick={() => navigate("/ingreso")}>
            <i className="fa-solid fa-user"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
