import { IProducto } from "../types/IProducto";
import { BaseService } from "./BaseService";
import axios from "axios";
import { useProductoStore } from "../store/slices/ProductoStore";

// BaseService con endpoint general para productos
export const productoService = new BaseService<IProducto>("/productos");

// URL base de tu backend
const API_URL = "https://api-thrill-production.up.railway.app/api/productos";

// Crear producto
export const crearProducto = async (datosProducto: any, token: string) => {
  return axios.post(API_URL, datosProducto, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// Hook para eliminar producto con estado global
export const useEliminarProducto = () => {
  const removeProducto = useProductoStore((state) => state.removeProducto);

  const eliminarProducto = async (productoId: string | number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No autenticado");

      await axios.delete(`${API_URL}/${productoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      removeProducto(productoId.toString());
      return { success: true };
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return { success: false, error };
    }
  };

  return { eliminarProducto };
};

// Actualizar producto
export const actualizarProducto = async (
  productoId: number,
  datosProducto: any,
  token: string
) => {
  try {
    const response = await axios.put(`${API_URL}/${productoId}`, datosProducto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};
// Agregar Stock
export const agregarStock = async (
  productoId: number | string,
  talle: string,
  stock: number
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");

  return axios.put(
    `https://api-thrill-production.up.railway.app/api/productos/${productoId}/stock`,
    {
      talle,
      stock,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};