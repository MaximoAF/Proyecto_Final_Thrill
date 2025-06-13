import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/EditarProducto.module.css";
import { Aside } from "./AsideAdmin";
import { HeaderAdmin } from "./HeaderAdmin";
import { useProductoStore } from "../../../store/slices/ProductoStore";
import { CrearProducto } from "./FormulariosProducto/CrearProducto";
import { EditarProductoForm } from "./FormulariosProducto/EditarProducto";
import { EliminarProducto } from "./FormulariosProducto/EliminarProducto";
import { IProducto } from "../../../types/IProducto";

// Interfaces para los datos que vamos a recibir de la API
interface ICategoria {
  id: number;
  nombre: string;
}

interface ITipo {
  id: number;
  nombre: string;
}

export const EditarProducto = () => {
  const productos = useProductoStore((state) => state.productos);
  const loadProducts = useProductoStore((state) => state.loadProducts);

  // Estados para los datos de la API
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [tipos, setTipos] = useState<ITipo[]>([]);

  const [paginaActual, setPaginaActual] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [mostrarFormularioEditar, setMostrarFormularioEditar] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<IProducto | null>(null);
  const [productosPagina, setProductosPagina] = useState<IProducto[]>([]);

  const productosPorPagina = 10;
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;

  const cambiarPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  useEffect(() => {
    loadProducts();

    const fetchDatosParaFormulario = async () => {
      try {
        const resCategorias = await axios.get(
          "https://api-thrill-production.up.railway.app/api/categorias"
        );
        setCategorias(resCategorias.data);

        const resTipos = await axios.get("https://api-thrill-production.up.railway.app/api/tipos");
        setTipos(resTipos.data);
      } catch (error) {
        console.error("Error al cargar datos para el formulario:", error);
      }
    };

    fetchDatosParaFormulario();
  }, [loadProducts]);

  useEffect(() => {
    setProductosPagina(productos.slice(indiceInicio, indiceFin));
  }, [productos, indiceInicio, indiceFin]);

  const productoParaEditar =
    productoSeleccionado && productoSeleccionado.id !== undefined
      ? productoSeleccionado
      : null;

  return (
    <div className="aside-mainContainer">
      {showForm && (
        <div className="overlay">
          <CrearProducto
            onClose={() => setShowForm(false)}
            categorias={categorias}
            tipos={tipos}
            onSubmitForm={(data) => {
              console.log("Datos enviados al backend:", data);
              loadProducts();
            }}
          />
        </div>
      )}

      {mostrarFormularioEditar && productoParaEditar && (
        <div className="overlay">
          <EditarProductoForm
            onClose={() => setMostrarFormularioEditar(false)}
            producto={productoParaEditar!}
            categorias={categorias}
            tipos={tipos}
            onSubmitForm={(data) => {
              console.log("Producto editado:", data);
              setProductoSeleccionado(null);
              loadProducts();
            }}
          />
        </div>
      )}

      {productoSeleccionado && mostrarEliminar && (
        <div className="overlay">
          <EliminarProducto
            producto={productoSeleccionado}
            onClose={() => {
              setMostrarEliminar(false);
              setProductoSeleccionado(null);
            }}
          />
        </div>
      )}

      <Aside />
      <div className={styles.container}>
        <HeaderAdmin />
        <h4>Productos</h4>
        <div className={styles.addContainer}>
          <button className="button-black" onClick={() => setShowForm(true)}>
            Agregar producto <i className="fa-solid fa-add"></i>
          </button>
        </div>

        <div className={styles.products}>
          {productosPagina.map((detalle) => (
            <div key={detalle.id} className={styles.separatorGap}>
              <div className={styles.productoCard}>
                <div className={styles.info}>
                  <h5>{detalle.nombre}</h5>
                  <p>Precio: ${detalle.precio}</p>
                  <p>
                    Descuento aplicado:{" "}
                    {detalle.descuentos?.[0]?.porcentajeDesc || "ninguno"}
                  </p>
                </div>
                <div className={styles.containerButtonActions}>
                  <button
                    className="button-black"
                    onClick={() => {
                      setProductoSeleccionado(detalle);
                      setMostrarFormularioEditar(true);
                    }}
                  >
                    Editar
                  </button>
                  <button 
                  className="button-black">
                    Agregar Stock
                  </button>
                  <button
                    className="button-black"
                    onClick={() => {
                      setProductoSeleccionado(detalle);
                      setMostrarEliminar(true);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.Productos}>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.pasarPagina}
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
            >
              <i className="fa-solid fa-arrow-left"></i> Anterior
            </button>
            <div className={styles.buttonsPage}>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                (pagina) => (
                  <button
                    key={pagina}
                    onClick={() => setPaginaActual(pagina)}
                    className={`${styles.pageButton} ${
                      paginaActual === pagina ? styles.selected : ""
                    }`}
                  >
                    {pagina}
                  </button>
                )
              )}
            </div>
            <button
              className={styles.pasarPagina}
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
            >
              Siguiente <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
