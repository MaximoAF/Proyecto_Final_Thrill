import { ICategoria } from "../../types/ICategoria";

export interface ICategoriaState {
  categorias: ICategoria[];
  activeCategoria: ICategoria | null;

  setActiveCategoria: (categoria: ICategoria) => void;
  clearActiveCategoria: () => void;

  addCategoria: (categoria: ICategoria) => void;
  removeCategoria: (categoriaId: string) => void;
  getCategoriaById: (categoriaId: string) => ICategoria | undefined;
  updateCategoria: (categoria: ICategoria) => void;
}
