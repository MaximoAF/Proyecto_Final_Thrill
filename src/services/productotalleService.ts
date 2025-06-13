import axios from "axios";
const API_URL = "https://api-thrill-production.up.railway.app/api/producto-talle";

export const obtenerTallesPorProducto = async (productoId: number) => {
  const response = await axios.get(`${API_URL}/producto/${productoId}`);
  return response.data;
};

export const crearProductoTalle = async (
  data: { productoId: number; talleId: number; stock: number },
  token: string
) => {
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const agregarStock = async (
  data: { productoId: number; talleId: number; cantidad: number },
  token: string
) => {
  const response = await axios.put(`${API_URL}/stock`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
