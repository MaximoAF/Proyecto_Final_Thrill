import { useState } from "react";
import styles from "../styles/EditarProducto.module.css";
import { Aside } from "./AsideAdmin";
import { HeaderAdmin } from "./HeaderAdmin";
import { useProductoStore } from "../../../store/slices/ProductoStore";
import { CrearProducto } from "./FormulariosProducto/CrearProducto";
import {EditarProductoForm} from "./FormulariosProducto/EditarProductoForm"
import { IProducto } from "../../../types/IProducto";
import { FC } from "react";

interface IDashboardproductProps {
  producto: IProducto
}

export const EditarProducto: FC<IDashboardproductProps> = () => {
  const productos = useProductoStore((state) => state.productos);
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarFormularioEditar, setMostrarFormularioEditar] = useState(false);

  const productosPorPagina = 10;
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;
  const productosPagina = productos.slice(indiceInicio, indiceFin);

  const cambiarPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  return (
    <div className="aside-mainContainer">
      {mostrarFormulario && (
        <div className="overlay">
          <CrearProducto onClose={() => setMostrarFormulario(false)} />
        </div>
      )}
      {mostrarFormularioEditar && (
        <div className="overlay">
          <EditarProductoForm onClose={() => setMostrarFormularioEditar(false)} />  
        </div>
      )}
      <Aside />
      <div className={styles.container}>
        <HeaderAdmin />
        <h4>Productos</h4>
        <div className={styles.addContainer}>
          <button
            className="button-black"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar producto <i className="fa-solid fa-add"></i>
          </button>
        </div>

        <div className={styles.products}>
          {productosPagina.map((detalle) => (
            <div key={detalle.id} className={styles.separatorGap}>
              <div className={styles.productoCard}>
                <div className={styles.info}>
                  <h5>{detalle.nombre}</h5>
                  <p>Precio: {detalle.precio} $</p>
                  <p>Unidades: {detalle.stock}</p>
                  <p>Descuento aplicado: {detalle.descuento}%</p>
                </div>
                <div className={styles.containerButton}>
                  <button 
                  className="button-black"
                  onClick={() => setMostrarFormularioEditar(true)}>Editar</button>
                  <button className="button-black" onClick={() => useProductoStore.getState().removeProducto(detalle.id.toString())}>Eliminar</button>
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
