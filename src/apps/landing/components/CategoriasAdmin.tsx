import { Aside } from './AsideAdmin'
import { HeaderAdmin } from './HeaderAdmin'
import styles from './../styles/CategoriasAdmin.module.css'
import { FC, useState } from 'react'
import { ICategoria } from '../../../types/ICategoria'
import { useCategoriaStore } from '../../../store/slices/CategoriaStore'
import { EliminarCategoria } from './FormulariosCategorias/EliminarCategoria'
import { CrearCategoria } from './FormulariosCategorias/CrearCategoria'
import { EditarCategoria } from './FormulariosCategorias/EditarCategoria'

export const CategoriasAdmin: FC = () => {
  const categorias = useCategoriaStore((state) => state.categorias)
  const [paginaActual, setPaginaActual] = useState(1)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarFormularioEditar, setMostrarFormularioEditar] = useState(false)
  const [mostrarEliminar, setMostrarEliminar] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<ICategoria | null>(null)

  const categoriasPorPagina = 10
  const totalPaginas = Math.ceil(categorias.length / categoriasPorPagina)

  const cambiarPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina)
    }
  }

  const indiceInicio = (paginaActual - 1) * categoriasPorPagina
  const indiceFin = indiceInicio + categoriasPorPagina
  const categoriasPaginadas = categorias.slice(indiceInicio, indiceFin)

  return (
    <div className="aside-mainContainer">
      {mostrarFormulario && (
        <div className="overlay">
          <CrearCategoria onClose={() => setMostrarFormulario(false)} />
        </div>
      )}
      {mostrarFormularioEditar && categoriaSeleccionada && (
        <div className="overlay">
          <EditarCategoria
            categoria={categoriaSeleccionada}
            onClose={() => {
              setMostrarFormularioEditar(false)
              setCategoriaSeleccionada(null)
            }}
          />
        </div>
      )}
      {categoriaSeleccionada && mostrarEliminar && (
        <div className="overlay">
          <EliminarCategoria
            categoria={categoriaSeleccionada}
            onClose={() => {
              setMostrarEliminar(false)
              setCategoriaSeleccionada(null)
            }}
          />
        </div>
      )}

      <Aside />
      <div className={styles.container}>
        <HeaderAdmin />
        <div className={styles.container}>
          <h4>Categorías</h4>
          <div className={styles.addContainer}>
          <button
            className="button-black"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar categoria <i className="fa-solid fa-add"></i>
          </button>
        </div>
          <div className={styles.products}>
            {categoriasPaginadas.map((detalle) => (
              <div key={detalle.id} className={styles.separatorGap}>
                <div className={styles.productoCard}>
                  <div className={styles.info}>
                    <h5>{detalle.nombre}</h5>
                    <p>Sub categoria: {detalle.subcategorias.length}</p>
                  </div>
                  <div className={styles.containerButtonActions}>
                    <button
                      className="button-black"
                      onClick={() => {
                        setCategoriaSeleccionada(detalle)
                        setMostrarFormularioEditar(true)
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="button-black"
                      onClick={() => {
                        setCategoriaSeleccionada(detalle)
                        setMostrarEliminar(true)
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.pasarPagina}
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
            >
              <i className="fa-solid fa-arrow-left"></i> Anterior
            </button>
            <div className={styles.buttonsPage}>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                <button
                  key={pagina}
                  onClick={() => setPaginaActual(pagina)}
                  className={`${styles.pageButton} ${
                    paginaActual === pagina ? styles.selected : ''
                  }`}
                >
                  {pagina}
                </button>
              ))}
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
  )
}
