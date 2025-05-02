import { useState } from "react";
import styles from "../../styles/ingreso/modals/Login.module.css";

export const Login = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
      <form className={styles.form}>
        <div className={styles.content}>
          <h3 className={styles.title}>Inicio de sesión</h3>
          <div className={styles.input}>
            <div className={styles.icon}>
              <i className="fa-regular fa-envelope"></i>
            </div>
            <input
              type="text"
              placeholder=" Ingrese su direccion de E-mail:"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.input}>
            <div className={styles.icon}>
              <i className="fa-solid fa-asterisk"></i>
            </div>
            <input
              type={showPass ? "text" : "password"}
              placeholder=" Ingrese su Contraseña:"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.icon}>
              <i
                className={`fa-regular ${showPass ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowPass(!showPass)}
              ></i>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className='button-black'
            onClick={() => console.log({ username, password })}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
  );
};
