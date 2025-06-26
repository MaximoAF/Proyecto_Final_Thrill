import { ICategoria } from "../types/ICategoria";
import { BaseService } from "./BaseService";
import axios from "axios";

export const categoriaService = new BaseService<ICategoria>('/categorias');


const BASE_URL = "https://api-thrill-production-85ac.up.railway.app/api/categorias";


export const getCategorias = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");

  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const crearCategoria = async (nombre: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");

  const response = await axios.post(
    BASE_URL,
    { nombre },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const actualizarCategoria = async (id: number, nombre: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");

  const response = await axios.put(
    `${BASE_URL}/${id}`,
    { nombre },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const eliminarCategoria = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");

  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
