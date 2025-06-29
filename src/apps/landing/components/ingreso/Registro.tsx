import { useFormik } from "formik";
import styles from "../../styles/ingreso/modals/Form.module.css";
import loadingIcon from "../../../../assets/Loading_icon.gif";
import * as yup from "yup";
import { register } from "../../../../services/usuarioService";
import { IRegister } from "../../../../types/IUsuario";
import { useSesionStore } from "../../../../store/slices/SesionStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface RegisterProps {
  toggleForm: () => void;
}

type TypeInitialValues = {
  nombre: string;
  email: string;
  password: string;
  repeatpassword: string;
};

const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  email: yup.string().email("Correo no válido").required("Campo requerido"),
  password: yup
    .string()
    .required("Campo requerido")
    .min(6, "Mínimo 6 caracteres"),
  repeatpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Campo requerido"),
});

export const Registro: React.FC<RegisterProps> = ({ toggleForm }) => {
  const setToken = useSesionStore((state) => state.setToken);
  const setSesion = useSesionStore((state) => state.setSesion);
  const navigate = useNavigate();

  const [buttonLoading, setButtonLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const formik = useFormik<TypeInitialValues>({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
      repeatpassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setButtonLoading(true);
      const nuevoUsuario: IRegister = {
        username: values.nombre,
        email: values.email,
        password: values.password,
      };

      try {
        const { token, usuario } = await register(nuevoUsuario);

        setToken(token);
        setSesion(usuario);

        navigate("/");
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("Error al registrar el usuario");
      }
      setButtonLoading(false);
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.content}>
        <h3 className={styles.title}>Registrarse</h3>

        <div className={styles.input}>
          <div className={styles.icon}>
            <i className="fa-regular fa-circle-user"></i>
          </div>
          <input
            type="text"
            placeholder="Ingrese su nombre:"
            {...formik.getFieldProps("nombre")}
          />
        </div>
        {formik.touched.nombre && formik.errors.nombre && (
          <small className={styles.error}>{formik.errors.nombre}</small>
        )}

        <div className={styles.input}>
          <div className={styles.icon}>
            <i className="fa-regular fa-envelope"></i>
          </div>
          <input
            type="text"
            placeholder="Ingrese su correo electrónico:"
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
            placeholder="Ingrese una contraseña:"
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
        {formik.touched.password && formik.errors.password && (
          <small className={styles.error}>{formik.errors.password}</small>
        )}

        <div className={styles.input}>
          <div className={styles.icon}>
            <i className="fa-solid fa-asterisk"></i>
          </div>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Repita la contraseña:"
            {...formik.getFieldProps("repeatpassword")}
          />
        </div>
        {formik.touched.repeatpassword && formik.errors.repeatpassword && (
          <small className={styles.error}>{formik.errors.repeatpassword}</small>
        )}
      </div>

      <div className="button-container">
        <button className="button-black" type="submit">
          {buttonLoading ? (
            <img
              style={{ position: "absolute", top: "-1.6rem", right: "0" }}
              src={loadingIcon}
              alt="loading..."
            />
          ) : (
            "Crear cuenta"
          )}
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
};
