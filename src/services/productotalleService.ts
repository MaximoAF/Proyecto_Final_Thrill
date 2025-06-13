import axios from "axios";

const BASE_URL = "https://api-thrill-production.up.railway.app/api/producto-talle";

export const agregarOActualizarStock = async (
  productoId: number,
  talleNombre: string, // <- Recibimos el nombre del talle (ej. "M")
  stock: number
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");

  console.log("Token enviado:", token);

  // Obtener todos los talles para buscar el ID según el nombre
  const talleRes = await axios.get(`${BASE_URL}/talle`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("Respuesta talle:", talleRes.data);

  // Buscar el talle por nombre
  const talleEncontrado = talleRes.data.find(
    (t: any) => t.nombre === talleNombre
  );

  if (!talleEncontrado) throw new Error("Talle no encontrado");

  const talleId = talleEncontrado.id;

  // Verificar si ya existe el producto-talle
  const existeRes = await axios.get(
    `${BASE_URL}/producto/${productoId}/talle/${talleId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (existeRes.data?.id) {
    const id = existeRes.data.id;

    // Actualizar stock si ya existe
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
  } else {
    // Crear nuevo producto-talle si no existe
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
  }
};
