import { useFormik } from "formik";
import * as yup from "yup";
import styles from "../../styles/FormProducto/AgregarStock.module.css";
import { agregarOActualizarStock } from "../../../../services/productotalleService";

interface AgregarStockProps {
  productoId: number;
  onStockAgregado?: () => void;
  onClose?: () => void;
}

export const AgregarStock: React.FC<AgregarStockProps> = ({
  productoId,
  onStockAgregado,
  onClose,
}) => {
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
    onSubmit: async (values, { resetForm }) => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No tienes token de autenticación. Debes iniciar sesión.");
        return;
      }

      try {
        await agregarOActualizarStock(
          productoId,
          values.talle,
          parseInt(values.stock.toString())
        );

        alert("Stock agregado correctamente");
        resetForm();
        if (onStockAgregado) onStockAgregado();
        if (onClose) onClose();
      } catch (error) {
        console.error("Error al agregar stock:", error);
        alert("Error al agregar stock");
      }
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <h2 className={styles.title}>Agregar stock</h2>

      <div className={styles.content}>
        <div className={styles.input}>
          <select
            name="talle"
            value={formik.values.talle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.talle && formik.errors.talle
                ? styles.errorInput
                : ""
            }
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
        </div>

        <div className={styles.input}>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.stock && formik.errors.stock
                ? styles.errorInput
                : ""
            }
          />
          {formik.touched.stock && formik.errors.stock && (
            <small className={styles.error}>{formik.errors.stock}</small>
          )}
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <button type="button" className="button-black" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="button-black">
          Agregar
        </button>
      </div>
    </form>
  );
};
