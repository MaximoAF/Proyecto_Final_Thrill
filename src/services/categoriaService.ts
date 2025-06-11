import { ICategoria } from "../types/ICategoria";
import { BaseService } from "./BaseService";


export const categoriaService = new BaseService<ICategoria>('/categorias');