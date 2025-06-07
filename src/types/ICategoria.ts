export interface ICategoria {
  id: number;
  nombre: string;
  tipo: string;
  idCategoriaPadre: number | null;
}

// Ejemplos 
const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

const remeraId = generateId();
const pantalonId = generateId();
const camperaId = generateId();

export const categoriasEjemplo: ICategoria[] = [
  // Categorías padre
  {
    id: remeraId,
    nombre: "Remeras",
    tipo: "Remera",
    idCategoriaPadre: null,
  },
  {
    id: pantalonId,
    nombre: "Pantalones",
    tipo: "Pantalón",
    idCategoriaPadre: null,
  },
  {
    id: camperaId,
    nombre: "Camperas",
    tipo: "Campera",
    idCategoriaPadre: null,
  },

  // Subcategorías de Remeras
  {
    id: generateId(),
    nombre: "Oversize",
    tipo: "Remera",
    idCategoriaPadre: remeraId,
  },
  {
    id: generateId(),
    nombre: "Slim Fit",
    tipo: "Remera",
    idCategoriaPadre: remeraId,
  },

  // Subcategorías de Pantalones
  {
    id: generateId(),
    nombre: "Cargo",
    tipo: "Pantalón",
    idCategoriaPadre: pantalonId,
  },
  {
    id: generateId(),
    nombre: "Jogger",
    tipo: "Pantalón",
    idCategoriaPadre: pantalonId,
  },

  // Subcategorías de Camperas
  {
    id: generateId(),
    nombre: "Canguro",
    tipo: "Campera",
    idCategoriaPadre: camperaId,
  },
  {
    id: generateId(),
    nombre: "Rompevientos",
    tipo: "Campera",
    idCategoriaPadre: camperaId,
  },

  // Otra categoría general
  {
    id: generateId(),
    nombre: "Accesorios",
    tipo: "Otro",
    idCategoriaPadre: null,
  },
];