import { FC } from "react";
import { ICategoria } from "../../../../types/ICategoria";

interface EditarCategoriaProps {
  categoria: ICategoria;
  onClose: () => void;
}

export const EditarCategoria: FC<EditarCategoriaProps> = ({ categoria, onClose }) => {
  // lógica y JSX...
  return (
    <div>
      <h3>Editar Categoría: {categoria.nombre}</h3>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};
