import { useFormik } from "formik";
import styles from "../../styles/ingreso/modals/Form.module.css";
import * as yup from "yup";
import { register } from "../../../../services/usuarioService";

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
  const formik = useFormik<TypeInitialValues>({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
      repeatpassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const nuevoUsuario = {
        username: values.nombre,
        email: values.email,
        password: values.password,
      };

      try {
        await register(nuevoUsuario);
        alert("Usuario registrado con éxito");
        toggleForm();
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("Error al registrar el usuario");
      }
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
            type="password"
            placeholder="Ingrese una contraseña:"
            {...formik.getFieldProps("password")}
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <small className={styles.error}>{formik.errors.password}</small>
        )}

        <div className={styles.input}>
          <div className={styles.icon}>
            <i className="fa-solid fa-asterisk"></i>
          </div>
          <input
            type="password"
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
};
