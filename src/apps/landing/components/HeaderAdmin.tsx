import styles from '../styles/HeaderAdmin.module.css';
import adminImagen from '../../../assets/imgs/adminImagen.jpg'

export const HeaderAdmin = () => {
  return (
  <div className={styles.container}>
    <div className={styles.imgContainer}>
      <img className={styles.imgLogo} src={adminImagen} alt="Admin" />
    </div>
    <div className={styles.adminName}>
      <p>Máximo Aguilera</p>
      <p>Admin</p>
    </div>
  </div>
  )
}
