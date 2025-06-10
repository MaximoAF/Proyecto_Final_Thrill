import { useCategoriaStore } from "../../../../store/slices/CategoriaStore";
import styles from "../../styles/FormProducto/EliminarProducto.module.css";
import { ICategoria } from "../../../../types/ICategoria";
import { FC } from "react";

interface IDashboardcategorieProps {
  categoria: ICategoria;
  onClose: () => void;
}

export const EliminarCategoria: FC<IDashboardcategorieProps> = ({ categoria, onClose }) => {
  const handleEliminar = () => {
    useCategoriaStore.getState().removeCategoria(categoria.id);
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h4>¿Seguro que quieres eliminar este categoria?</h4>
        <p><strong>{categoria.nombre}</strong></p>
      </div>
      <div className={styles.containerButton}>
        <button className="button-black" onClick={onClose}>Cancelar</button>
        <button className="button-black" onClick={handleEliminar}>Eliminar</button>
      </div>
    </div>
  );
};
