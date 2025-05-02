import styles from '../styles/Header.module.css'
import thrillLogoBlack from '../../../assets/svg/thrill_logo-dark.svg';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.ofert}>
        <p>Hasta 30% OFF en seleccionados</p>
        <button className={styles.close}><i className="fa-solid fa-xmark"></i></button>
      </div>
      <div className={styles.navBar}>

        <div className={styles.imgContainer} onClick={()=>navigate('/')}>
          <img src={thrillLogoBlack} alt="Thrill" />
        </div>

        <div className={styles.navButtons}>
          <select className={styles.button} name="header_buttons" >
            <option value="Tienda" selected>Tienda</option>
            <option value="Opcion 1" >Opcion 1</option>
            <option value="Opcion 2" >Opcion 2</option>
            <option value="Opcion 3" >Opcion 3</option>
            <option value="Opcion 4" >Opcion 4</option>
          </select>
          <button className={styles.button} >Promociones</button>
          <button className={styles.button} >Outfits</button>
          <button className={styles.button} >Nuevo</button>
        </div>
        
        <div className={styles.buscador}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input className={styles.inputBuscador} type="text" placeholder="Buscar productos..."/>
        </div>
        
        <div className={styles.icons}>
          <i className="fa-solid fa-cart-shopping"></i>
          <i className="fa-solid fa-user"></i>
        </div>

      </div>
    </div>
  )
}
