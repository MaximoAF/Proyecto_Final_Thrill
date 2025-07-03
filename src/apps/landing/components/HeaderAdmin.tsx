import styles from "../styles/HeaderAdmin.module.css";
import adminImagen from "../../../assets/imgs/adminImagen.jpg";
import { useSesionStore } from "../../../store/slices/SesionStore";

export const HeaderAdmin = () => {
  const sesion = useSesionStore((state) => state.sesion);
  return (
    <div className={styles.container}>
      {sesion && (
        <>
          <div className={styles.imgContainer}>
            <img className={styles.imgLogo} src={adminImagen} alt="Admin" />
          </div>

          <div className={styles.adminName}>
            <p>{`${sesion.username}`}</p>
            <p>Admin</p>
          </div>
        </>
      )}
    </div>
  );
};
