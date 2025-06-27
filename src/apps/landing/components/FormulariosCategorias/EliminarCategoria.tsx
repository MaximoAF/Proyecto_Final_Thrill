import { useCategoriaStore } from "../../../../store/slices/CategoriaStore";
import styles from "../../styles/FormProducto/EliminarProducto.module.css";
import { ICategoria } from "../../../../types/ICategoria";
import { FC } from "react";
import { eliminarCategoria,getCategorias } from "../../../../services/categoriaService";

interface IDashboardcategorieProps {
  categoria: ICategoria;
  onClose: () => void;
}

export const EliminarCategoria: FC<IDashboardcategorieProps> = ({ categoria, onClose }) => {
const setCategorias = useCategoriaStore(state => state.setCategorias);

const handleEliminar = async () => {
  try {
    await eliminarCategoria(categoria.id); // llama al backend para eliminar lógico
    const categoriasActualizadas = await getCategorias(); // trae la lista actualizada
    setCategorias(categoriasActualizadas); // actualiza el estado global
    onClose();
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
  }
};

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h4>¿Seguro que quieres eliminar esta categoría?</h4>
        <p><strong>{categoria.nombre}</strong></p>
      </div>
      <div className={styles.containerButton}>
        <button className="button-black" onClick={onClose}>Cancelar</button>
        <button className="button-black" onClick={handleEliminar}>Eliminar</button>
      </div>
    </div>
  );
};