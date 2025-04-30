import { useState } from "react";
import styles from "../../styles/ingreso/modals/Login.module.css";

export const Login = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState(""); // 🔹 Nuevo estado
  const [showRegister, setShowRegister] = useState(false);

  const toggleForm = () => {
    setShowRegister(!showRegister);
    setUsername("");
    setPassword("");
    setRepeatPassword("");
  };

  if (showRegister) {
    // Registro
    return (
      <form className={styles.form}>
        <div className={styles.content}>
          <h3 className={styles.title}>Registrarse</h3>

          <div className={styles.input}>
            <div className={styles.icon}>
              <i className="fa-regular fa-envelope"></i>
            </div>
            <input
              type="text"
              placeholder="Ingrese un nombre de usuario:"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.input}>
            <div className={styles.icon}>
              <i className="fa-solid fa-asterisk"></i>
            </div>
            <input
              type="password"
              placeholder="Ingrese una contraseña:"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.input}>
            <div className={styles.icon}>
              <i className="fa-solid fa-asterisk"></i>
            </div>
            <input
              type="password"
              placeholder="Repita la contraseña:"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              console.log("Registro", { username, password, repeatPassword });
            }}
          >
            Crear cuenta
          </button>
        </div>

        <p className={styles.registerText}>
          ¿Ya tenés una cuenta?{" "}
          <span className={styles.link} onClick={toggleForm}>
            Iniciá sesión
          </span>
        </p>
      </form>
    );
  }
  /* Inicio de sesión */
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
            placeholder="Ingrese su dirección de E-mail:"
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
            placeholder="Ingrese su Contraseña:"
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
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            console.log("Login", { username, password });
          }}
        >
          Iniciar sesión
        </button>
      </div>

      <p className={styles.registerText}>
        ¿No tenés una cuenta?{" "}
        <span className={styles.link} onClick={toggleForm}>
          Registrate acá
        </span>
      </p>
    </form>
  );
};
