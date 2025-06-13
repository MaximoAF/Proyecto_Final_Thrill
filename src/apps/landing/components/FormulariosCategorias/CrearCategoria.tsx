import styles from "../../styles/FormProducto/CrearProducto.module.css";
import { FC, useState } from "react";
import { crearCategoria } from "../../../../services/categoriaService"; // Asegurate de importar bien

interface ICrearCategoriaProps {
  onClose: () => void;
  onCategoriaCreada?: () => void;
}

export const CrearCategoria: FC<ICrearCategoriaProps> = ({ onClose, onCategoriaCreada }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("El nombre es requerido.");
      return;
    }

    try {
      await crearCategoria(name.trim());
      alert("Categoría creada exitosamente");
      if (onCategoriaCreada) onCategoriaCreada();
      onClose();
    } catch (err) {
      console.error("Error al crear la categoría:", err);
      setError("No se pudo crear la categoría.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.content}>
        <h2 className={styles.title}>Crear Categoría</h2>
      </div>

      <div className={styles.input}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
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
          Aceptar
        </button>
      </div>
    </form>
  );
};