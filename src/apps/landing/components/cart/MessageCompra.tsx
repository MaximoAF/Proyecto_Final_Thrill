import { FC } from "react";
import styles from "../../styles/cart/MessageCompra.module.css";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface IMessageCompraProps {
  onClose: () => void;
  message: string;
}

export const MessageCompra: FC<IMessageCompraProps> = ({
  onClose,
  message,
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <p style={{ fontSize: "1.5rem" }}>
          <b>Compra</b>
        </p>

        <button
          className="i-btn"
          onClick={() => {
            onClose();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <i className="fa-solid fa-x fa-lg"></i>
        </button>
      </div>
      {/* Separador */}
      <div className="separator"></div>
      <AnimatePresence>
        {/* Mensajes */}
        {message === "pagado" && (
          <>
            <p style={{ fontSize: "1.5rem" }}>Compra realizada con exito</p>
            <motion.div
              initial={{ opacity: 0, x: -140 }}
              animate={{ opacity: 1, x: 0}}
              exit={{ opacity: 0, x: 40}}
              transition={{ type: "tween", stiffness: 300 }}
            >
              <div className={styles.iconContainer}>
                <i className="fa-solid fa-truck"></i>
              </div>
            </motion.div>
          </>
        )}
        {/* Mensajes */}
        {message === "fallido" && (
          <>
            <p style={{ fontSize: "1.5rem" }}>Compra fallida</p>
            <motion.div
              initial={{ opacity: 0, x: -140 }}
              animate={{ opacity: 1, x: 0}}
              exit={{ opacity: 0, x: 40}}
              transition={{ type: "tween", stiffness: 300 }}
            >
              <div className={styles.iconContainer}>
                <i style={{fontSize: '6rem'}} className="fa-solid fa-circle-exclamation"></i>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          style={{ marginTop: "3rem", flexGrow: "1" }}
          className="button-black"
          onClick={() => navigate("/ingreso")}
        >
          Ir a la sesion
        </button>
      </div>
    </div>
  );
};
