import styles from "../styles/Aside.module.css"
import ThrillLogoWhite from '../../../assets/svg/thrill_logo-light.svg';
import { useNavigate } from 'react-router-dom';


export const Aside = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <button onClick={()=>navigate('/')}>
          <img className={styles.imgLogo} src={ThrillLogoWhite} alt="Thrill" />
        </button>
        </div>
        <div className={styles.buttonContainers}>
            <button onClick={()=>navigate('/admin/dashboard')}><i className="fa-solid fa-chart-simple"></i> Dashboard</button>
            <button onClick={()=>navigate('/admin/producto')}><i className="fa-solid fa-list"></i> Productos</button>
            <button onClick={()=>navigate('/admin/categorias')}><i className="fa-solid fa-layer-group"></i> Categorias</button>
        </div>
        <div>
        <p className={styles.copyrigth} style={{ whiteSpace: "pre-line" }}>
          {"thrill clothes © 2000-2023, \n All Rights Reserved"}
        </p>
        </div>
    </div>
  )
}