import { ICategoria } from "../../types/ICategoria";

export interface ICategoriaState {
  categorias: ICategoria[];
  activeCategoria: ICategoria | null;

  loadCategoria: () => Promise<void>;

  setActiveCategoria: (categoria: ICategoria) => void;
  clearActiveCategoria: () => void;

  addCategoria: (categoria: ICategoria) => void;
  removeCategoria: (categoriaId: number) => void;
  updateCategoria: (categoria: ICategoria) => void;

  getCategoriaById: (categoriaId: number) => ICategoria | undefined;
  getCategoriaByName: (categoriaName: string) => ICategoria | undefined;
}
