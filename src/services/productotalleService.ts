import axios from "axios";

const BASE_URL = "https://api-thrill-production-85ac.up.railway.app/api/producto-talle";

export const agregarOActualizarStock = async (
  productoId: number,
  talleId: number,
  stock: number
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");

try {
  const existeRes = await axios.get(
    `${BASE_URL}/producto/${productoId}/talle/${talleId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (existeRes.data?.id) {
    const id = existeRes.data.id;

    await axios.put(
      `${BASE_URL}/${id}`,
      {
        ...existeRes.data,
        stock,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
} catch (error: any) {
  if (error.response && error.response.status === 404) {
    await axios.post(
      BASE_URL,
      {
        producto: { id: productoId },
        talle: { id: talleId },
        stock,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } else {
    console.error("Error en agregarOActualizarStock:", error);
    throw error;
  }
}
};


export const obtenerTallesPorProducto = async (productoId: number) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");

  const response = await axios.get(`${BASE_URL}/producto/${productoId}/talle`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};