import { useFormik } from "formik";
import * as yup from "yup";
import styles from "../../styles/FormProducto/AgregarStock.module.css";
import {agregarOActualizarStock} from "../../../../services/productotalleService";
import { useEffect, useState } from "react";
import { IProducto } from "../../../../types/IProducto";
import { ITalle } from "../../../../types/ITalle";
import axios from "axios";

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
  const [stockActual, setStockActual] = useState<number | null>(null);

  if (!producto) {
    console.warn("El producto es undefined. No se puede cargar talles.");
    return;
  }

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
      if (!token) return;

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

  useEffect(() => {
    const fetchTallesPorTipo = async () => {
      const token = localStorage.getItem("token");

      if (!token || !producto?.tipo?.id) return;

      setLoading(true);

      try {
        const res = await axios.get(
          `https://api-thrill-production-85ac.up.railway.app/api/tipos/${producto.tipo.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const tipoEncontrado = res.data;

        if (tipoEncontrado?.talles) {
          setTalles(tipoEncontrado.talles);
        }
      } catch (error) {
        console.error("Error cargando talles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTallesPorTipo();
  }, [producto]);

  useEffect(() => {
    const fetchStock = async () => {
      const token = localStorage.getItem("token");
      if (!token || !formik.values.talle) return;

      try {
        const res = await axios.get(
          `https://api-thrill-production-85ac.up.railway.app/api/producto-talle/producto/${producto.id}/talle/${formik.values.talle}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data?.stock != null) {
          formik.setFieldValue("stock", res.data.stock);
          setStockActual(res.data.stock);
        } else {
          formik.setFieldValue("stock", "");
          setStockActual(null);
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          formik.setFieldValue("stock", "");
          setStockActual(null);
        } else {
          console.error("Error obteniendo stock actual:", error);
        }
      }
    };

    fetchStock();
  }, [formik.values.talle]);
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
          {stockActual != null && (
            <small className={styles.info}>Stock actual: {stockActual}</small>
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
