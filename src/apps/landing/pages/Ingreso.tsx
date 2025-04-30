import { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Login } from "../components/ingreso/Login";
import { Registro } from "../components/Registro/Registro";
import { QRIngreso } from "../components/ingreso/QRIngreso";
import styles from "../styles/ingreso/ingreso.module.css";

export const Ingreso = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.title}>Ingreso</h2>
        <div className={styles.gridForms}>
          {showRegister ? (
            <Registro toggleForm={() => setShowRegister(false)} />
          ) : (
            <Login toggleForm={() => setShowRegister(true)} />
          )}
          <QRIngreso />
        </div>
      </div>
      <Footer />
    </div>
  );
};
