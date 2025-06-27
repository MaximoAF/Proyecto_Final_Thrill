import { useState } from "react";
import { useSesionStore } from "../../../store/slices/SesionStore";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from "../styles/Profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export const Perfil = () => {
  const sesion = useSesionStore((state) => state.sesion);
  const closeSesion = useSesionStore((state) => state.closeSesion);

  const navigate = useNavigate();

  const [showCloseSesion, setShowCloseSesion] = useState<boolean>(false);

  return (
    <div className="flex-page">
      <Header />

      {/* Main */}
      {sesion && (
        <div className={styles.container}>
          {/* Link ruta */}
          <p style={{ color: "var(--black-60)" }}>
            <Link to="/" style={{ color: "var(--black-60)" }}>
              Home{" "}
            </Link>{" "}
            <i className="fa-solid fa-chevron-right fa-xs"></i>{" "}
            <span style={{ color: "var(--black-color)" }}>Tu usuario</span>
          </p>
          <h2 className={styles.title}>Tu usuario</h2>
          <div className={styles.gridContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.imageContainer}>
                {sesion.imagenPerfil ? (
                  <img src={sesion.imagenPerfil.url} alt="Imagen de perfil" />
                ) : (
                  <i className="fa-solid fa-image"></i>
                )}
              </div>

              <div>
                <h2>{sesion.username}</h2>
                <p>{sesion.email}</p>
              </div>

              <button
                className="button-black"
                style={{ width: "100%" }}
                onClick={() => setShowCloseSesion(true)}
              >
                Cambiar contraseña
              </button>
              {/* Separador */}
              <div className="separator" />

              {/* Cerrar sesion */}
              <button
                className="button-black"
                style={{ width: "100%" }}
                onClick={() => setShowCloseSesion(true)}
              >
                Cerrar sesion
              </button>
            </div>

            <div className={styles.flexGap}>
              <div className={styles.camposContainer}>
                <div className="flex-between">
                  <p className="bold-24px">Direccion:</p>
                  <button className="button-black">Agregar</button>
                </div>
                <div className="separator" />
                {sesion.direcciones.length > 0 ? (
                  <div>{sesion.direcciones[0].calle}</div>
                ) : (
                  <div>
                    <div className={styles.iconContainer}>
                      <i className="fa-solid fa-map-location-dot"></i>
                    </div>
                    <p className={styles.noCampo}>
                      No tienes ninguna direccion
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.camposContainer}>
                <div className="flex-between">
                  <p className="bold-24px">Ordenes de compra:</p>
                  <button className="button-black">ir a comprar</button>
                </div>
                <div className="separator" />
                {sesion.ordenes?.length > 0 ? (
                  <p>orden id: {sesion.ordenes[0].id}</p>
                ) : (
                  <div>
                    <div className={styles.iconContainer}>
                      <i className="fa-solid fa-truck"></i>
                    </div>
                    <p className={styles.noCampo}>No tienes ninguna orden</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* close sesion */}
          <AnimatePresence>
            {showCloseSesion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "tween", stiffness: 300 }}
                className="overlay"
              >
                <div className={styles.colseContainer}>
                  <div className={styles.closeContent}>
                    <p style={{ fontSize: "1.5rem" }}>
                      <b>{sesion.username}</b>
                    </p>

                    <button
                      className="i-btn"
                      onClick={() => {
                        setShowCloseSesion(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <i className="fa-solid fa-x fa-lg"></i>
                    </button>
                  </div>
                  {/* Separador */}
                  <div className="separator"></div>

                  {/* Mensaje */}
                  <p style={{ fontSize: "1.5rem" }}>
                    Seguro deseas cerrar la sesion?
                  </p>

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                      style={{ marginTop: "3rem", flexGrow: "1" }}
                      className="button-black"
                      onClick={() => closeSesion()}
                    >
                      Cerrar la sesion
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <Footer />
    </div>
  );
};
