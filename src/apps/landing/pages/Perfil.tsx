import { useEffect, useState } from "react";
import { useSesionStore } from "../../../store/slices/SesionStore";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from "../styles/Profile.module.css";
import loadingIcon from "../../../assets/Loading_icon.gif";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DireccionForm } from "../components/FormulariosPerfil/DireccionForm";
import { getOrdenesByUser } from "../../../services/ordencompraService";
import { IOrdenCompra } from "../../../types/IOrdenCompra";
import { IDireccion } from "../../../types/IDireccion";

export const Perfil = () => {
  const sesion = useSesionStore((state) => state.sesion);
  const closeSesion = useSesionStore((state) => state.closeSesion);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCloseSesion, setShowCloseSesion] = useState<boolean>(false);
  const [showFormDireccion, setShowFormDireccion] = useState<boolean>(false);
  const [ordenes, setOrdenes] = useState<IOrdenCompra[]>([]);
  const [direcciones, setDirecciones] = useState<IDireccion[]>([]);

  const handleDeleteDireccion = async (id: number) => {
    try {
      //await direccionService.delete(id);
      setDirecciones((prev) => prev.filter((dir) => dir.id !== id));
    } catch (error) {
      console.error("Error al eliminar la direccion:", error);
    }
  };

  useEffect(() => {
    const fechPerfil = async () => {
      try {
        if (sesion) {
          const res = await getOrdenesByUser(sesion.id);
          setOrdenes(res);
          setDirecciones(sesion.direcciones);
        }
      } catch (error) {
        throw new Error("Error al obtener las ordenes");
      }
      setIsLoading(false);
    };
    fechPerfil();
    document.title = sesion ? `${sesion.username} - Thrill` : "Thrill";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [sesion]);

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
            {/* Usuario info */}
            <div>
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
            </div>

            {/* Main info */}
            <div className={styles.flexGap}>
              {/* Direcciones */}
              <div className={styles.camposContainer}>
                <div className="flex-between">
                  <p className="bold-24px">Direccion:</p>
                  <button
                    className="button-black"
                    onClick={() => setShowFormDireccion(true)}
                  >
                    Agregar
                  </button>
                </div>
                <div className="separator" />

                <AnimatePresence>
                  {direcciones.length > 0 ? (
                    direcciones.map((dir, i) => (
                      <>
                        {/* Separador */}
                        {i > 0 && <div className="separator" />}
                        <motion.div
                          key={dir.id}
                          initial={{ opacity: 0, y: 20, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -20, height: 0 }}
                          transition={{ type: "tween", stiffness: 300 }}
                        >
                          <div className="flex-between">
                            <p className="bold">{`Direccion ${dir.calle}`}</p>
                            <div
                              className="i-btn"
                              onClick={() => handleDeleteDireccion(dir.id)}
                            >
                              <i
                                style={{
                                  fontSize: "1.5rem",
                                  color: "var(--red-color)",
                                }}
                                className="fa-regular fa-trash-can"
                              ></i>
                            </div>
                          </div>
                          <p>
                            Localidad:{" "}
                            <span className={styles.gray}>{dir.localidad}</span>
                          </p>
                          <p>
                            Calle:{" "}
                            <span className={styles.gray}>{dir.calle}</span>
                          </p>
                          <p>
                            Codigo postal:{" "}
                            <span className={styles.gray}>{dir.codpostal}</span>
                          </p>
                        </motion.div>
                      </>
                    ))
                  ) : isLoading ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      transition={{ type: "tween", stiffness: 300 }}
                    >
                      <div className={styles.iconContainer}>
                        <img
                          style={{ height: "7rem" }}
                          src={loadingIcon}
                          alt="Loading..."
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      transition={{ type: "tween", stiffness: 300 }}
                    >
                      <div className={styles.iconContainer}>
                        <i className="fa-solid fa-map-location-dot"></i>
                      </div>
                      <p className={styles.noCampo}>
                        No tienes ninguna direccion
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Ordenes */}
              <div className={styles.camposContainer}>
                <div className="flex-between">
                  <p className="bold-24px">Ordenes de compra:</p>
                  <button
                    className="button-black"
                    onClick={() => navigate("/")}
                  >
                    ir a comprar
                  </button>
                </div>
                <div className="separator" />
                <AnimatePresence>
                  {ordenes.length > 0 ? (
                    ordenes.map((ord, i) => (
                      <>
                        {/* Separador */}
                        {i > 0 && <div className="separator" />}
                        <motion.div
                          initial={{ opacity: 0, y: 20, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -20, height: 0 }}
                          transition={{ type: "tween", stiffness: 300 }}
                        >
                          <p className="bold">{`Orden de compra ${i + 1}:`}</p>
                          <p>
                            Costo de productos:{" "}
                            <span className={styles.gray}>${ord.total}</span>
                          </p>
                          <p>
                            Consto de envio:{" "}
                            <span className={styles.gray}>
                              ${ord.costoEnvio}
                            </span>
                          </p>
                          <p>
                            Metodo de pago:{" "}
                            <span className={styles.gray}>
                              {"Mercado Pago"}
                            </span>
                          </p>
                          <p>
                            Fecha de compra:{" "}
                            <span className={styles.gray}>{ord.fecha}</span>
                          </p>
                          <p>
                            Estado:{" "}
                            <span className={styles.gray}>
                              {ord.estadoOrden}
                            </span>
                          </p>
                          <br />
                          <p className="bold">Productos: </p>
                          {ord.detalles.map((det) => (
                            <>
                              <p>
                                {`${det.productoTalle.producto.nombre}[${det.productoTalle.talle.talle}] `}
                                <span className={styles.gray}>
                                  {`x ${det.cantidad}`}
                                </span>
                              </p>
                            </>
                          ))}
                          <br />
                          <p className="bold">
                            Total pagado:{" "}
                              ${ord.total + ord.costoEnvio}
                          </p>
                        </motion.div>
                      </>
                    ))
                  ) : isLoading ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      transition={{ type: "tween", stiffness: 300 }}
                    >
                      <div className={styles.iconContainer}>
                        <img
                          style={{ height: "7rem" }}
                          src={loadingIcon}
                          alt="Loading..."
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      transition={{ type: "tween", stiffness: 300 }}
                    >
                      <div className={styles.iconContainer}>
                        <i className="fa-solid fa-truck"></i>
                      </div>
                      <p className={styles.noCampo}>No tienes ninguna orden</p>
                    </motion.div>
                  )}
                </AnimatePresence>
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

          {/* crear direccion */}
          <AnimatePresence>
            {showFormDireccion && (
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
                      <b>Crear Direccion</b>
                    </p>

                    <button
                      className="i-btn"
                      onClick={() => {
                        setShowFormDireccion(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <i className="fa-solid fa-x fa-lg"></i>
                    </button>
                  </div>

                  {/* Separador */}
                  <div className="separator"></div>

                  <DireccionForm
                    usuario={sesion}
                    onClose={() => setShowFormDireccion(false)}
                  />
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
