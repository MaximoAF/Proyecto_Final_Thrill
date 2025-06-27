import { ErrorMessage, Field, Form, Formik } from "formik";
import { direccionService } from "../../../../services/direccionService";
import * as yup from "yup";
import { useSesionStore } from "../../../../store/slices/SesionStore";
import { IUsuario } from "../../../../types/IUsuario";
import styles from "../../styles/FormPerfil/DireccionForm.module.css";

interface IDireccionFormProps {
  usuario: IUsuario;
  onClose: () => void;
}

export const DireccionForm = ({ usuario, onClose }: IDireccionFormProps) => {
  const setSesion = useSesionStore((state) => state.setSesion);

  const initialValues = {
    calle: "",
    localidad: "",
    codpostal: "",
  };

  const validationSchema = yup.object({
    calle: yup.string().required("Campo obligatorio"),
    localidad: yup.string().required("Campo obligatorio"),
    codpostal: yup
      .string()
      .matches(/^\d{4,8}$/, "Código postal inválido")
      .required("Campo obligatorio"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const payload = {
      ...values,
      usuario: { id: usuario.id },
    };
    try {
      const res = await direccionService.create(payload);
      const sesionUpdated = {
        ...usuario,
        direcciones: [...usuario.direcciones, res],
      };
      setSesion(sesionUpdated);
      onClose()
    } catch (err) {
      console.error("Error al crear dirección:", err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.formContainer}>
        <div className={styles.inputsContainer}>
          <label className="bold-24px">Calle</label>
          <Field className="input-white" name="calle" placeholder="calle" />
          <ErrorMessage name="calle" component="div" className="bold-red" />
        </div>

        <div className={styles.inputsContainer}>
          <label className="bold-24px">Localidad</label>
          <Field
            className="input-white"
            name="localidad"
            placeholder="localidad"
          />
          <ErrorMessage name="localidad" component="div" className="bold-red" />
        </div>

        <div className={styles.inputsContainer}>
          <label className="bold-24px">Código Postal</label>
          <Field
            className="input-white"
            name="codpostal"
            placeholder="codpostal"
          />
          <ErrorMessage name="codpostal" component="div" className="bold-red" />
        </div>

        <button
          style={{ margin: "0 auto" }}
          className="button-black"
          type="submit"
        >
          Crear Dirección
        </button>
      </Form>
    </Formik>
  );
};
