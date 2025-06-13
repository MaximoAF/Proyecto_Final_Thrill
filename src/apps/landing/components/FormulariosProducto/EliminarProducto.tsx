import styles from "../../styles/FormProducto/EliminarProducto.module.css";
import { IProducto } from "../../../../types/IProducto";
import { FC, useState } from "react";
import { useEliminarProducto } from "../../../../services/productoService";

interface IDashboardproductProps {
  producto: IProducto;
  onClose: () => void;
}

export const EliminarProducto: FC<IDashboardproductProps> = ({ producto, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { eliminarProducto } = useEliminarProducto();

  const handleEliminar = async () => {
    setLoading(true);
    setError(null);
    const result = await eliminarProducto(producto.id);
    if (result.success) {
      onClose();
    } else {
      setError("Error al eliminar el producto. Intenta nuevamente.");
    }
    setLoading(false);
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
