import { useProductoStore } from "../../../../store/slices/ProductoStore";
import styles from "../../styles/FormProducto/EliminarProducto.module.css";
import { IProducto } from "../../../../types/IProducto";
import { FC, useState } from "react";
import axios from "axios";

interface IDashboardproductProps {
  producto: IProducto;
  onClose: () => void;
}

export const EliminarProducto: FC<IDashboardproductProps> = ({ producto, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEliminar = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No autenticado");

      await axios.delete(`http://localhost:8080/api/productos/${producto.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      useProductoStore.getState().removeProducto(producto.id.toString());

      onClose();
    } catch (err: any) {
      console.error("Error al eliminar producto:", err);
      setError("Error al eliminar el producto. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h4>¿Seguro que quieres eliminar este producto?</h4>
        <p><strong>{producto.nombre}</strong></p>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.containerButton}>
        <button className="button-black" onClick={onClose} disabled={loading}>
          Cancelar
        </button>
        <button className="button-black" onClick={handleEliminar} disabled={loading}>
          {loading ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  );
};
