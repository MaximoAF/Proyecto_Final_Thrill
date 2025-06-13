import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Login } from "../components/ingreso/Login";
import { Registro } from "../components/ingreso/Registro";
import { QRIngreso } from "../components/ingreso/QRIngreso";
import styles from "../styles/ingreso/ingreso.module.css";
import { useSesionStore } from "../../../store/slices/SesionStore";

export const Ingreso = () => {
  const [showRegister, setShowRegister] = useState(false);
  const sesion = useSesionStore((state) => state.sesion);
  const cerrarSesion = useSesionStore((state)=> state.closeSesion)

  useEffect(() => {
    document.title = `Ingreso - Thrill`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Header />
      {sesion ? (
        <div className={styles.content}>
          <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
            <div>
              <h2>{sesion.username}</h2>
              <p>{sesion.email}</p>
            </div>
            <button className="button-black" onClick={()=>cerrarSesion()}>Cerrar sesion</button>
          </div>
          <div className={styles.gridForms}>
            <form>
              <p>Direccion:</p>
            </form>
          </div>
        </div>
      ) : (
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
      )}
      <Footer />
    </div>
  );
};
