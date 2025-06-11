import { useFormik } from "formik";
import * as yup from "yup";
import styles from "../../styles/FormProducto/AgregarStock.module.css";

export const AgregarStock = () => {
  const formik = useFormik({
    initialValues: {
      talle: "Promocion",
      stock: "",
    },
    validationSchema: yup.object({
      talle: yup
        .string()
        .notOneOf(["Promocion"], "Debe seleccionar un talle")
        .required("Talle requerido"),
      stock: yup
        .number()
        .typeError("Debe ser un número")
        .integer("Debe ser un número entero")
        .positive("Debe ser mayor que cero")
        .required("Stock requerido"),
    }),
    onSubmit: (values) => {
      console.log("Valores enviados:", values);
    },
  });

  return (
    <form className={styles.container} onSubmit={formik.handleSubmit}>
      <div className={styles.input}>
        <select
          name="talle"
          value={formik.values.talle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="Promocion" disabled>
            Seleccionar Talle
          </option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        {formik.touched.talle && formik.errors.talle && (
          <small className={styles.error}>{formik.errors.talle}</small>
        )}

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.stock && formik.errors.stock && (
          <small className={styles.error}>{formik.errors.stock}</small>
        )}
      </div>

      <button type="submit" className="button-black">
        Agregar
      </button>
    </form>
  );
};
