import { Header } from "../components/Header";
import { Login } from "../components/ingreso/Login";
import { QRIngreso } from "../components/ingreso/QRIngreso";
import styles from "../styles/ingreso/ingreso.module.css";

export const Ingreso = () => {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.tittle}>Ingreso</h2>
        <div className={styles.gridForms}>
          <Login />
          <QRIngreso />
        </div>
      </div>
    </div>
  );
};
