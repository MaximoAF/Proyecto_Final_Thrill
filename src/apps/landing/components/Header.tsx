import styles from "../styles/Header.module.css";
import thrillLogoBlack from "../../../assets/svg/thrill_logo-dark.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Header = () => {
  const navigate = useNavigate();
  const [oferClosed, setOferClosed] = useState<boolean>(false);

  return (
    <div>
      <AnimatePresence>
        {!oferClosed && (
          <motion.div
            className={styles.sale}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0}}
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
          <select className={styles.button} name="header_buttons">
            <option value="Tienda" selected>
              Tienda
            </option>
            <option value="Opcion 1">Opcion 1</option>
            <option value="Opcion 2">Opcion 2</option>
            <option value="Opcion 3">Opcion 3</option>
            <option value="Opcion 4">Opcion 4</option>
          </select>
          <button className={styles.button}>Promociones</button>
          <button className={styles.button}>Outfits</button>
          <button className={styles.button}>Nuevo</button>
        </div>

        <div className={styles.buscador}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className={styles.inputBuscador}
            type="text"
            placeholder="Buscar productos..."
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
