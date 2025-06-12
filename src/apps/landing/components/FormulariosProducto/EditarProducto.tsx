import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "../../styles/FormProducto/CrearProducto.module.css";

interface ICategoria {
  id: number;
  nombre: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  color: string;
  marca: string;
  imagenes: File[];
  categoria: ICategoria[];
}

interface EditarProductoFormProps {
  producto: Producto;
  onCancel: () => void;
  onSave: () => void;
}

const validationSchema = Yup.object({
  nombre: Yup.string().required("Requerido"),
  precio: Yup.number().required("Requerido").positive("Debe ser positivo"),
  descripcion: Yup.string().required("Requerido"),
  color: Yup.string().required("Requerido"),
  marca: Yup.string().required("Requerido"),
  categoria: Yup.array()
    .of(
      Yup.object({
        id: Yup.number().required(),
        nombre: Yup.string().required(),
      })
    )
    .min(1, "Selecciona al menos una categoría"),
});

export const EditarProductoForm: React.FC<EditarProductoFormProps> = ({
  producto,
  onCancel,
  onSave,
}) => {
  const [vistaPreviaImagenes, setVistaPreviaImagenes] = useState<string[]>([]);
  const [categoriasDisponibles, setCategoriasDisponibles] = useState<ICategoria[]>(
    []
  );

  // Opcional: Si tienes un tipo, lo traes igual
  // const [tiposDisponibles, setTiposDisponibles] = useState<Tipo[]>([]);

  // Imagen principal para previsualizar (la primera o una seleccionada)
  const [imagenPrincipal, setImagenPrincipal] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      color: producto.color,
      marca: producto.marca,
      imagenes: [] as File[], // para imágenes nuevas a subir
      categoria: producto.categoria || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("nombre", values.nombre);
        formData.append("precio", values.precio.toString());
        formData.append("descripcion", values.descripcion);
        formData.append("color", values.color);
        formData.append("marca", values.marca);
        values.categoria.forEach((cat) =>
          formData.append("categoria", JSON.stringify(cat))
        );
        values.imagenes.forEach((img) => formData.append("imagenes", img));

        await axios.put(
          `http://localhost:8080/api/productos/${producto.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        onSave();
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    },
  });

  useEffect(() => {
    axios
      .get<ICategoria[]>("http://localhost:8080/api/categorias")
      .then((res) => setCategoriasDisponibles(res.data));
  }, []);

  const handleImagenesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const fileArray = Array.from(files);
      formik.setFieldValue("imagenes", fileArray);

      // Generar preview URLs
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setVistaPreviaImagenes(previews);
      // Por defecto, la primera imagen nueva es principal
      if (previews.length > 0) setImagenPrincipal(previews[0]);
    }
  };

  // Permitir seleccionar cuál imagen es la principal
  const handleSetAsPrincipal = (url: string) => {
    setImagenPrincipal(url);
  };

  const toggleCategoria = (categoria: ICategoria) => {
    const actual = formik.values.categoria;
    const existe = actual.find((c) => c.id === categoria.id);
    if (existe) {
      formik.setFieldValue(
        "categoria",
        actual.filter((c) => c.id !== categoria.id)
      );
    } else {
      formik.setFieldValue("categoria", [...actual, categoria]);
    }
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
      <div className={styles.content}>
        <h2 className={styles.title}>Editar producto</h2>

        <div className={styles.uploadContainer}>
          <label htmlFor="imageUpload" className={styles.imageUpload}>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagenesChange}
              style={{ display: "none" }}
            />
            {imagenPrincipal ? (
              <img
                src={imagenPrincipal}
                alt="Imagen principal"
                className={styles.previewImage}
              />
            ) : (
              <i
                className={`fa-solid fa-arrow-up-from-bracket ${styles.uploadIcon}`}
              ></i>
            )}
          </label>

          <div className={styles.thumbnailsContainer}>
            {vistaPreviaImagenes.map((url) => (
              <img
                key={url}
                src={url}
                alt="Miniatura"
                className={styles.thumbnailImage}
                onClick={() => handleSetAsPrincipal(url)}
              />
            ))}
          </div>
        </div>
        {formik.touched.imagenes && typeof formik.errors.imagenes === "string" && (
          <small className={styles.error}>{formik.errors.imagenes}</small>
        )}

        <input
          type="text"
          placeholder="Nombre"
          {...formik.getFieldProps("nombre")}
        />
        {formik.touched.nombre && formik.errors.nombre && (
          <small className={styles.error}>{formik.errors.nombre}</small>
        )}

        <input
          type="number"
          placeholder="Precio"
          {...formik.getFieldProps("precio")}
        />
        {formik.touched.precio && formik.errors.precio && (
          <small className={styles.error}>{formik.errors.precio}</small>
        )}

        <input
          type="text"
          placeholder="Descripción"
          {...formik.getFieldProps("descripcion")}
        />
        {formik.touched.descripcion && formik.errors.descripcion && (
          <small className={styles.error}>{formik.errors.descripcion}</small>
        )}

        <input
          type="text"
          placeholder="Color"
          {...formik.getFieldProps("color")}
        />
        {formik.touched.color && formik.errors.color && (
          <small className={styles.error}>{formik.errors.color}</small>
        )}

        <input
          type="text"
          placeholder="Marca"
          {...formik.getFieldProps("marca")}
        />
        {formik.touched.marca && formik.errors.marca && (
          <small className={styles.error}>{formik.errors.marca}</small>
        )}

        {/* Categorías */}
        <div className={styles.categoriasScroll}>
          <div className={styles.checkboxGroup} role="group" aria-labelledby="checkbox-group">
            <h4 className={styles.groupTitle}>Categorías</h4>
            {categoriasDisponibles.map((cat) => (
              <label key={cat.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formik.values.categoria.some((c) => c.id === cat.id)}
                  onChange={() => toggleCategoria(cat)}
                />
                {cat.nombre}
              </label>
            ))}
          </div>
        </div>
        {formik.touched.categoria && typeof formik.errors.categoria === "string" && (
          <small className={styles.error}>{formik.errors.categoria}</small>
        )}

        <div className={styles.buttonsContainer}>
          <button
            type="button"
            className="button-black"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="button-black"
            disabled={formik.isSubmitting || !formik.dirty}
          >
            {formik.isSubmitting ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </form>
  );
};
