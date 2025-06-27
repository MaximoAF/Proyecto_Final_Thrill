import { IProducto } from "../types/IProducto";
import { BaseService } from "./BaseService";
import axios from "axios";
import { useProductoStore } from "../store/slices/ProductoStore";
import { useSesionStore } from "../store/slices/SesionStore";

export const productoService = new BaseService<IProducto>("/productos");

const API_URL =
  "https://api-thrill-production-85ac.up.railway.app/api/productos";

export const crearProducto = async (datosProducto: any, token: string) => {
  if (!token) {
    throw new Error("Token no disponible. Debes iniciar sesión.");
  }

  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    console.log("Token payload:", payload);
  } catch (error) {
    console.warn("No se pudo decodificar el token", error);
  }

  try {
    const response = await axios.post(API_URL, datosProducto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error respuesta backend:", error.response?.data);
      throw new Error(
        `Error al crear producto: ${error.response?.status} - ${JSON.stringify(
          error.response?.data
        )}`
      );
    } else {
      console.error("Error desconocido:", error);
      throw error;
    }
  }
};

export const useEliminarProducto = () => {
  const removeProducto = useProductoStore((state) => state.removeProducto);

  const eliminarProducto = async (productoId: string | number) => {
    try {
      const token = useSesionStore.getState().token;
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

export const actualizarProducto = async (
  productoId: number,
  datosProducto: any,
  token: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}/${productoId}`,
      datosProducto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};
