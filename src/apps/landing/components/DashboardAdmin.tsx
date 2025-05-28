import styles from '../styles/DashboardAdmin.module.css'
import { Aside } from './AsideAdmin'
import { HeaderAdmin } from './HeaderAdmin'
import { GraficoVentas } from './Grafico/GraficoVentas'
export const DashboardAdmin = () => {

      return (
      <div className="aside-main__container">
        <Aside/>
        <div className={styles.main}>
          <HeaderAdmin/>
            <div className={styles.container}>
              <div className={styles.cuadros}>

              <div className={styles.vistasInfo}>
                <i className="fa-regular fa-eye"></i>
                <h4>33,05 k</h4>
                <p>Total de vistas</p>
              </div>
              <div className={styles.vistasInfo}>
                <i className="fa-solid fa-cart-shopping"></i>
                <h4>$30,1 k</h4>
                <p>Total de ventas</p>
              </div>
              <div className={styles.vistasInfo}>
                <i className="fa-solid fa-tag"></i>
                <h4>2.150 u</h4>
                <p>Productos en stock</p>
              </div>
              <div className={styles.vistasInfo}>
                <i className="fa-solid fa-user"></i>
                <h4>2,55 k</h4>
                <p>usuarios</p>
              </div>
              </div>
              <div className={styles.graficoVentas}>
                <GraficoVentas/>
              </div>
            </div>
          </div>
        </div>
  )
}
