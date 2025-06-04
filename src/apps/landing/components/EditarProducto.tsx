import { useState } from "react";
import styles from "../styles/EditarProducto.module.css";
import { Aside } from "./AsideAdmin";
import { HeaderAdmin } from "./HeaderAdmin";
import { useCarritoStore } from "../../../store/slices/CarritoStore";
import { ProductCart } from "./cart/ProductCart";
import { CrearProducto } from "./FormulariosProducto/CrearProducto";

export const EditarProducto = () => {
  const [paginaActual, setPaginaActual] = useState("1");
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  return (
    <div className="aside-mainContainer">
      {mostrarFormulario && (
          <div className="overlay">
            <CrearProducto onClose={()=>setMostrarFormulario(false)}/>
          </div>
      )}
      <Aside/>
      <div className={styles.container}>
        <HeaderAdmin />
        <h4>Productos</h4>
        <div className={styles.addContainer}>

          <button className="button-black" onClick={()=>setMostrarFormulario(true)}>
            Agregar producto <i className="fa-solid fa-add"></i>
          </button>
        </div>
        <div className={styles.products}>
            {useCarritoStore((state) => state.detallesProducto).map(
              (detalle, i) => (
                <div className={styles.separatorGap}>
                  {i !== 0 && <div className="separator" />} {/* Separador */}
                  <ProductCart detalleCompra={detalle} />
                </div>
              )
            )}
          </div>
        <div className={styles.Productos}>
          <div className={styles.buttonsContainer}>
            <button className={styles.pasarPagina}>
              <i className="fa-solid fa-arrow-left"></i> Anterior
            </button>
            <div className={styles.buttonsPage}>
              {["1", "2", "3", "4", "5"].map((pagina) => (
                <button
                  key={pagina}
                  onClick={() => setPaginaActual(pagina)}
                  className={`${styles.pageButton} ${
                    paginaActual === pagina ? styles.selected : ""
                  }`}
                >
                  {pagina}
                </button>
              ))}
            </div>
            <button className={styles.pasarPagina}>
              Siguiente <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
