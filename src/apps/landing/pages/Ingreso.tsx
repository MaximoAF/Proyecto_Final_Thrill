import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Login } from "../components/ingreso/Login";
import { Registro } from "../components/ingreso/Registro";
import { QRIngreso } from "../components/ingreso/QRIngreso";
import styles from "../styles/ingreso/ingreso.module.css";
import { useSesionStore } from "../../../store/slices/SesionStore";
import { usuarioService } from "../../../services/usuarioService";
import { useNavigate } from "react-router-dom";

export const Ingreso = () => {
  const [showRegister, setShowRegister] = useState(false);
  const sesion = useSesionStore((state) => state.sesion);
  const setSesion = useSesionStore((state) => state.setSesion);
  const navigate = useNavigate()

  const getSesionNew = async () => {
    if (sesion) {
      try {
        const usuarioRes = await usuarioService.getById(sesion.id);
        setSesion(usuarioRes);
      } catch (error: any) {
        console.log("password", error.message || "Error en inicio de sesión");
      }
    }
  };

  useEffect(() => {
    sesion && navigate('/perfil')
    document.title = `Ingreso - Thrill`;
    window.scrollTo({ top: 0, behavior: "smooth" });

    getSesionNew();
  }, []);
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
