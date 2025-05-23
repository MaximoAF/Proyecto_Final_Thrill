import styles from "../styles/Aside.module.css"
import ThrillLogoWhite from '../../../assets/svg/thrill_logo-light.svg';

export const Aside = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
          <img className={styles.imgLogo} src={ThrillLogoWhite} alt="Thrill" />
        </div>

        

        <div className={styles.buttonContainers}>
            <button><i className="fa-solid fa-chart-simple"></i> Dashboard</button>
            <button><i className="fa-solid fa-list"></i> Productos</button>
            <button><i className="fa-solid fa-layer-group"></i> Categorias</button>
            <button><i className="fa-solid fa-users"></i> Usuarios</button>
        </div>
        <div>
        <p className={styles.copyrigth} style={{ whiteSpace: "pre-line" }}>
          {"thrill clothes © 2000-2023, \n All Rights Reserved"}
        </p>
        </div>
    </div>
  )
}