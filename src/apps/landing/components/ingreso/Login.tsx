import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../../styles/ingreso/modals/Form.module.css";
import loadingIcon from "../../../../assets/Loading_icon.gif";
import { login } from "../../../../services/usuarioService";
import { useSesionStore } from "../../../../store/slices/SesionStore";

interface LoginProps {
  toggleForm: () => void;
}

export const Login: React.FC<LoginProps> = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const setToken = useSesionStore((state) => state.setToken);
  const setSesion = useSesionStore((state) => state.setSesion);

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
      setButtonLoading(true)
      try {
        const { token, usuario } = await login({
          username: values.username,
          password: values.password,
        });

        setToken(token);
        setSesion(usuario);

        navigate("/");
      } catch (error: any) {
        setFieldError("password", error.message || "Error en inicio de sesión");
      } finally {
        setSubmitting(false);
      }
      setButtonLoading(false)
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
          {buttonLoading ? (
            <img style={{position: 'absolute', top: "-1.6rem",right: '0' }} src={loadingIcon} alt="loading..." />
          ) : (
            "Iniciar sesión"
          )}
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
