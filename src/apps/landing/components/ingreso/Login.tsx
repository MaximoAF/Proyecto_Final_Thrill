import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UsuarioStore } from "../../../../store/slices/UsuarioStore";
import styles from "../../styles/ingreso/modals/Form.module.css";

interface LoginProps {
  toggleForm: () => void;
}

export const Login: React.FC<LoginProps> = ({ toggleForm }) => {
  const navigate = useNavigate();
  const usuarios = UsuarioStore((state) => state.usuarios);
  const setActiveUsuario = UsuarioStore((state) => state.setActiveUsuario);
  const [showPass, setShowPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Correo no válido").required("Campo requerido"),
      password: yup.string().required("Campo requerido"),
    }),
    onSubmit: (values, { setFieldError, setSubmitting }) => {
      const usuario = usuarios.find(
        (u) =>
          u.email.trim().toLowerCase() === values.email.trim().toLowerCase() &&
          u.password === values.password
      );

      if (usuario) {
        setActiveUsuario(usuario);
        navigate("/");
      } else {
        setFieldError("password", "Correo o contraseña incorrectos");
      }

      setSubmitting(false);
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.content}>
        <h3 className={styles.title}>Inicio de sesión</h3>

        <div className={styles.input}>
          <div className={styles.icon}>
            <i className="fa-regular fa-envelope"></i>
          </div>
          <input
            type="text"
            placeholder="Ingrese su dirección de E-mail:"
            {...formik.getFieldProps("email")}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <small className={styles.error}>{formik.errors.email}</small>
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
        {(formik.touched.password || formik.submitCount > 0) && formik.errors.password && (
          <small className={styles.error}>{formik.errors.password}</small>
        )}
      </div>

      <div className="button-container">
        <button className="button-black" type="submit" disabled={formik.isSubmitting}>
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
