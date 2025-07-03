import styles from "../../styles/FormCategoria/CrearCategoria.module.css";
import { FC, useState } from "react";
import { actualizarCategoria } from "../../../../services/categoriaService";
import { ICategoria } from "../../../../types/ICategoria";

interface IEditarCategoriaProps {
  categoria: ICategoria;
  onClose: () => void;
  onCategoriaEditada?: () => void;
}

export const EditarCategoria: FC<IEditarCategoriaProps> = ({
  categoria,
  onClose,
  onCategoriaEditada,
}) => {
  const [nombre, setNombre] = useState(categoria.nombre);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("El nombre es requerido.");
      return;
    }

    try {
      await actualizarCategoria(categoria.id, nombre.trim());
      alert("Categoría editada exitosamente");
      if (onCategoriaEditada) onCategoriaEditada();
      onClose();
    } catch (err) {
      console.error("Error al editar la categoría:", err);
      setError("No se pudo editar la categoría.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <h2 className={styles.title}>Editar Categoría</h2>
      </div>

      <div className="input-white">
        <input
          type="text"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            setError("");
          }}
        />
        {error && <small className={styles.error}>{error}</small>}
      </div>

      <div className={styles.buttonsContainer}>
        <button type="button" className="button-black" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="button-black">
          Guardar
        </button>
      </div>
    </form>
  );
};
