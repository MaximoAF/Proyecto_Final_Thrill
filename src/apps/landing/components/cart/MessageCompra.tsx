import { FC } from "react";
import styles from "../../styles/cart/MessageCompra.module.css";
import { useNavigate } from "react-router-dom";

interface IMessageCompraProps {
  onClose: () => void;
  message: string;
}

export const MessageCompra:FC<IMessageCompraProps> = ({onClose, message}) => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div
        className={styles.infoContainer}
      >
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
      
      {/* Mensajes */}
      <p style={{ fontSize: "1.5rem" }}>{message}</p>

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
