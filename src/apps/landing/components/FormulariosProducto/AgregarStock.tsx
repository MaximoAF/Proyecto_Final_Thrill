import { useFormik } from "formik";
import * as yup from "yup";
import styles from "../../styles/FormProducto/AgregarStock.module.css";
import { agregarOActualizarStock } from "../../../../services/productotalleService";
import { useEffect, useState } from "react";
import { tipoService } from "../../../../services/tipoService";
import { IProducto } from "../../../../types/IProducto";
import { ITipo } from "../../../../types/ITipo";
import { ITalle } from "../../../../types/ITalle";

interface AgregarStockProps {
  producto: IProducto;
  onStockAgregado?: () => void;
  onClose?: () => void;
}

export const AgregarStock: React.FC<AgregarStockProps> = ({
  producto,
  onStockAgregado,
  onClose,
}) => {
  const [talles, setTalles] = useState<ITalle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTallesPorTipo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para cargar talles");
        return;
      }

      if (!producto?.tipo?.id) {
        alert("El producto no tiene tipo asignado");
        return;
      }

      setLoading(true);

      try {
        const tipoEncontrado: ITipo = await tipoService.getById(producto.tipo.id);
        setTalles(tipoEncontrado.talles);
      } catch (error) {
        console.error("Error cargando talles:", error);
        alert("No se pudieron cargar los talles");
      } finally {
        setLoading(false);
      }
    };

    fetchTallesPorTipo();
  }, [producto]);

  const formik = useFormik({
    initialValues: {
      talle: "",
      stock: "",
    },
    validationSchema: yup.object({
      talle: yup.string().required("Debe seleccionar un talle"),
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
          producto.id,
          parseInt(values.talle),
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
            disabled={loading || talles.length === 0}
          >
            <option value="" disabled>
              {loading ? "Cargando talles..." : "Seleccionar Talle"}
            </option>
            {talles.map((t) => (
              <option key={t.id} value={t.id}>
                {t.talle}
              </option>
            ))}
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
        <button type="submit" className="button-black" disabled={loading}>
          Agregar
        </button>
      </div>
    </form>
  );
};
