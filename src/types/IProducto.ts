import { IImageProducto } from "./IImageProducto";

import imgEjemplo from "../assets/imgs/remeraEj.png";
import imgEjemplo2 from "../assets/imgs/imageEj2.png";

export interface IProducto {
  id: number;
  imgs: IImageProducto[]
  nombre: string;
  precio: number;
  idCategoria: number;
  descripcion: string;
  talleProducto: string;
  stock: number;
  color: string;
  descuento: number;
}

// Productos Ejemplos
const generateId = () => Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`);
export const productosEjemplo = [
    {
      id: generateId(),
      nombre: "Camiseta Oversize Negra",
      precio: 7999,
      idCategoria: 1,
      descripcion: "Camiseta oversize negra de algodón premium.",
      talleProducto: "S",
      stock: 6,
      color: "Negro",
      imgs: [
        {
          id: 101,
          idProducto: 1,
          url: imgEjemplo,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Camiseta Oversize Negra",
      precio: 7999,
      idCategoria: 1,
      descripcion: "Camiseta oversize negra de algodón premium.",
      talleProducto: "M",
      stock: 4,
      color: "Negro",
      imgs: [
        {
          id: 101,
          idProducto: 1,
          url: imgEjemplo,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Camiseta Oversize Negra",
      precio: 7999,
      idCategoria: 1,
      descripcion: "Camiseta oversize negra de algodón premium.",
      talleProducto: "L",
      stock: 10,
      color: "Negro",
      imgs: [
        {
          id: 101,
          idProducto: 1,
          url: imgEjemplo,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Camiseta Oversize Negra",
      precio: 7999,
      idCategoria: 1,
      descripcion: "Camiseta oversize negra de algodón premium.",
      talleProducto: "XL",
      stock: 8,
      color: "Negro",
      imgs: [
        {
          id: 101,
          idProducto: 1,
          url: imgEjemplo,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Buzo Hoodie Gris Minimalista",
      precio: 15499,
      idCategoria: 2,
      descripcion: "Buzo gris claro con diseño minimalista.",
      talleProducto: "S",
      stock: 5,
      color: "Gris",
      imgs: [
        {
          id: 102,
          idProducto: 2,
          url: imgEjemplo,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Buzo Hoodie Gris Minimalista",
      precio: 15499,
      idCategoria: 2,
      descripcion: "Buzo gris claro con diseño minimalista.",
      talleProducto: "M",
      stock: 11,
      color: "Gris",
      imgs: [
        {
          id: 102,
          idProducto: 2,
          url: imgEjemplo,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Buzo Hoodie Gris Minimalista",
      precio: 15499,
      idCategoria: 2,
      descripcion: "Buzo gris claro con diseño minimalista.",
      talleProducto: "L",
      stock: 9,
      color: "Gris",
      imgs: [
        {
          id: 102,
          idProducto: 2,
          url: imgEjemplo,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Buzo Hoodie Gris Minimalista",
      precio: 15499,
      idCategoria: 2,
      descripcion: "Buzo gris claro con diseño minimalista.",
      talleProducto: "XL",
      stock: 6,
      color: "Gris",
      imgs: [
        {
          id: 102,
          idProducto: 2,
          url: imgEjemplo,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Pantalón Cargo Verde Militar",
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      talleProducto: "S",
      stock: 8,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Pantalón Cargo Verde Militar",
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      talleProducto: "M",
      stock: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Pantalón Cargo Verde Militar",
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      talleProducto: "L",
      stock: 5,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Pantalón Cargo Verde Militar",
      precio: 18999,
      idCategoria: 3,
      descripcion: "Pantalón cargo verde militar resistente.",
      talleProducto: "XL",
      stock: 7,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Remera Básica Blanca",
      precio: 21999,
      idCategoria: 3,
      descripcion: "Remera básica blanca de algodón orgánico.",
      talleProducto: "S",
      stock: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Remera Básica Blanca",
      precio: 21999,
      idCategoria: 6,
      descripcion: "Remera básica blanca de algodón orgánico.",
      talleProducto: "M",
      stock: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Remera Básica Blanca",
      precio: 21999,
      idCategoria: 3,
      descripcion: "Remera básica blanca de algodón orgánico.",
      talleProducto: "L",
      stock: 5,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    {
      id: generateId(),
      nombre: "Remera Básica Blanca",
      precio: 21999,
      idCategoria: 8,
      descripcion: "Remera básica blanca de algodón orgánico.",
      talleProducto: "XL",
      stock: 3,
      color: "Verde Militar",
      imgs: [
        {
          id: 103,
          idProducto: 3,
          url: imgEjemplo2,
          principal: true,
        },
      ],
    },
    // REMERA OVERSIZE NEGRA
  {
    id: generateId(),
    nombre: "Remera Oversize Negra",
    precio: 24999,
    idCategoria: 3,
    descripcion: "Remera negra oversize de algodón pesado.",
    talleProducto: "S",
    stock: 5,
    color: "Negro",
    imgs: [
      {
        id: 201,
        idProducto: 1,
        url: imgEjemplo2,
        principal: true,
      },
    ],
  },
  {
    id: generateId(),
    nombre: "Remera Oversize Negra",
    precio: 24999,
    idCategoria: 3,
    descripcion: "Remera negra oversize de algodón pesado.",
    talleProducto: "M",
    stock: 4,
    color: "Negro",
    imgs: [
      {
        id: 202,
        idProducto: 1,
        url: imgEjemplo2,
        principal: true,
      },
    ],
  },
  {
    id: generateId(),
    nombre: "Remera Oversize Negra",
    precio: 24999,
    idCategoria: 3,
    descripcion: "Remera negra oversize de algodón pesado.",
    talleProducto: "L",
    stock: 3,
    color: "Negro",
    imgs: [
      {
        id: 203,
        idProducto: 1,
        url: imgEjemplo2,
        principal: true,
      },
    ],
  },
  {
    id: generateId(),
    nombre: "Remera Oversize Negra",
    precio: 24999,
    idCategoria: 3,
    descripcion: "Remera negra oversize de algodón pesado.",
    talleProducto: "XL",
    stock: 2,
    color: "Negro",
    imgs: [
      {
        id: 204,
        idProducto: 1,
        url: imgEjemplo2,
        principal: true,
      },
    ],
  },

  // PANTALÓN CARGO BEIGE
  {
    id: generateId(),
    nombre: "Pantalón Cargo Beige",
    precio: 34999,
    idCategoria: 5,
    descripcion: "Cargo beige con múltiples bolsillos, ideal para el día a día.",
    talleProducto: "S",
    stock: 4,
    color: "Beige",
    imgs: [
      {
        id: 205,
        idProducto: 2,
        url: imgEjemplo,
        principal: true,
      },
    ],
  },
  {
    id: generateId(),
    nombre: "Pantalón Cargo Beige",
    precio: 34999,
    idCategoria: 5,
    descripcion: "Cargo beige con múltiples bolsillos, ideal para el día a día.",
    talleProducto: "M",
    stock: 3,
    color: "Beige",
    imgs: [
      {
        id: 206,
        idProducto: 2,
        url: imgEjemplo,
        principal: true,
      },
    ],
  },
  {
    id: generateId(),
    nombre: "Pantalón Cargo Beige",
    precio: 34999,
    idCategoria: 5,
    descripcion: "Cargo beige con múltiples bolsillos, ideal para el día a día.",
    talleProducto: "L",
    stock: 2,
    color: "Beige",
    imgs: [
      {
        id: 207,
        idProducto: 2,
        url: imgEjemplo,
        principal: true,
      },
    ],
  },
  {
    id: generateId(),
    nombre: "Pantalón Cargo Beige",
    precio: 34999,
    idCategoria: 5,
    descripcion: "Cargo beige con múltiples bolsillos, ideal para el día a día.",
    talleProducto: "XL",
    stock: 2,
    color: "Beige",
    imgs: [
      {
        id: 208,
        idProducto: 2,
        url: imgEjemplo,
        principal: true,
      },
    ],
  },

  // CAMPERA PUFFER NEGRA
  {
    id: generateId(),
    nombre: "Campera Puffer Negra",
    precio: 49999,
    idCategoria: 7,
    descripcion: "Campera inflable negra con interior térmico.",
    talleProducto: "S",
    stock: 4,
    color: "Negro",
    imgs: [
      {
        id: 209,
        idProducto: 3,
        url: imgEjemplo2,
        principal: true,
      },
    ],
  },
  {
    id: generateId(),
    nombre: "Campera Puffer Negra",
    precio: 49999,
    idCategoria: 7,
    descripcion: "Campera inflable negra con interior térmico.",
    talleProducto: "M",
    stock: 3,
    color: "Negro",
    imgs: [
      {
        id: 210,
        idProducto: 3,
        url: imgEjemplo2,
        principal: true,
      },
    ],
  },
  {
    id: generateId(),
    nombre: "Campera Puffer Negra",
    precio: 49999,
    idCategoria: 7,
    descripcion: "Campera inflable negra con interior térmico.",
    talleProducto: "L",
    stock: 3,
    color: "Negro",
    imgs: [
      {
        id: 211,
        idProducto: 3,
        url: imgEjemplo2,
        principal: true,
      },
    ],
  },
  {
    id: generateId(),
    nombre: "Campera Puffer Negra",
    precio: 49999,
    idCategoria: 7,
    descripcion: "Campera inflable negra con interior térmico.",
    talleProducto: "XL",
    stock: 2,
    color: "Negro",
    imgs: [
      {
        id: 212,
        idProducto: 3,
        url: imgEjemplo2,
        principal: true,
      },
    ],
  },
    
  ]
