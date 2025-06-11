import { useProductoStore } from "../../../../store/slices/ProductoStore";
import styles from "../../styles/FormProducto/EliminarProducto.module.css";
import { IProducto } from "../../../../types/IProducto";
import { FC } from "react";

interface IDashboardproductProps {
  producto: IProducto;
  onClose: () => void;
}

export const EliminarProducto: FC<IDashboardproductProps> = ({ producto, onClose }) => {
  const handleEliminar = () => {
    useProductoStore.getState().removeProducto(producto.id.toString());
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h4>¿Seguro que quieres eliminar este producto?</h4>
        <p><strong>{producto.nombre}</strong></p>
      </div>
      <div className={styles.containerButton}>
        <button className="button-black" onClick={onClose}>Cancelar</button>
        <button className="button-black" onClick={handleEliminar}>Eliminar</button>
      </div>
    </div>
  );
};
