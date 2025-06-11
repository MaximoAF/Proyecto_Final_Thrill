import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UsuarioStore } from "../../../../store/slices/UsuarioStore";
import axios from "axios";
import styles from "../../styles/ingreso/modals/Form.module.css";

interface LoginProps {
  toggleForm: () => void;
}

export const Login: React.FC<LoginProps> = ({ toggleForm }) => {
  const navigate = useNavigate();
  const setActiveUsuario = UsuarioStore((state) => state.setActiveUsuario);
  const [showPass, setShowPass] = useState(false);
  const setToken = UsuarioStore((state) => state.setToken);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Campo requerido"),
      password: yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: values.username, // cambió a username
            password: values.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Credenciales inválidas");
        }

        const data = await response.json();
        // Supongamos que el JSON tiene: { token: "...", usuario: { ... } }
        const { token, usuario } = data;

        if (!token || !usuario) {
          throw new Error("Datos incompletos del servidor");
        }

        setToken(token); // guardo token en store
        setActiveUsuario(usuario); // guardo usuario activo en store

        // Opcional: guardo en localStorage para persistencia
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));

        navigate("/");
      } catch (error: any) {
        setFieldError("password", error.message || "Error en inicio de sesión");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.content}>
        <h3 className={styles.title}>Inicio de sesión</h3>

        <div className={styles.input}>
          <div className={styles.icon}>
            <i className="fa-regular fa-circle-user"></i>
          </div>
          <input
            type="text"
            placeholder="Ingrese su usuario:"
            {...formik.getFieldProps("username")}
          />
        </div>
        {formik.touched.username && formik.errors.username && (
          <small className={styles.error}>{formik.errors.username}</small>
        )}

        <div className={styles.input}>
          <div className={styles.icon}>
            <i className="fa-solid fa-asterisk"></i>
          </div>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Ingrese su contraseña:"
            {...formik.getFieldProps("password")}
          />
          <div className={styles.icon}>
            <i
              className={`fa-regular ${showPass ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowPass(!showPass)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
        {(formik.touched.password || formik.submitCount > 0) &&
          formik.errors.password && (
            <small className={styles.error}>{formik.errors.password}</small>
          )}
      </div>

      <div className="button-container">
        <button
          className="button-black"
          type="submit"
          disabled={formik.isSubmitting}
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
