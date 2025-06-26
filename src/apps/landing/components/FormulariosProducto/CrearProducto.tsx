import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "../../styles/FormProducto/CrearProducto.module.css";
import { handleImageUpload } from "./UploadImage";
import { crearProducto } from "../../../../services/productoService";

interface ICategoria {
  id: number;
  nombre: string;
}

interface ITipo {
  id: number;
  nombre: string;
}

interface ICrearProductoProps {
  onClose: () => void;
  categorias: ICategoria[];
  tipos: ITipo[];
  onSubmitForm?: (values: any) => void;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export const CrearProducto: React.FC<ICrearProductoProps> = ({
  onClose,
  categorias,
  tipos,
  onSubmitForm,
}) => {
  const [imagenesPreview, setImagenesPreview] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      imagenesPreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagenesPreview]);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      descripcion: "",
      color: "",
      marca: "",
      categoriaIds: [] as number[],
      tipoId: "",
      imagenes: [] as File[],
    },
    validationSchema: yup.object({
      nombre: yup.string().required("Nombre es requerido"),
      precio: yup
        .number()
        .typeError("Precio debe ser un número")
        .required("Precio es requerido")
        .positive("Precio debe ser positivo"),
      descripcion: yup.string().required("Descripción es requerida"),
      color: yup.string().required("Color es requerido"),
      marca: yup.string().required("Marca es requerida"),
      categoriaIds: yup
        .array()
        .min(1, "Debes seleccionar al menos una categoría")
        .required("Categoría es requerida"),
      tipoId: yup.string().required("Tipo es requerido"),
      imagenes: yup.array().min(1, "Debes subir al menos una imagen"),
    }),
    onSubmit: async (values) => {
      try {
        const urls = await handleImageUpload(values.imagenes);

        const datosProducto = {
          nombre: values.nombre,
          precio: parseFloat(values.precio.toString()),
          descripcion: values.descripcion,
          color: values.color,
          marca: values.marca,
          tipoId: parseInt(values.tipoId),
          categoriaIds: values.categoriaIds,
          cantidad: 0,
          imagenes: urls.map((url) => ({
            id: 0,
            eliminado: false,
            url,
          })),
        };

        const token = localStorage.getItem("token");
        if (!token) {
          alert("No tienes token de autenticación. Debes iniciar sesión.");
          return;
        }
        console.log("Datos a enviar:", datosProducto);
        console.log("URLs cargadas desde Cloudinary:", urls);
        
        const response = await crearProducto(datosProducto, token);
        console.log("Producto creado:", response.data);
        if (onSubmitForm) onSubmitForm(values);
        onClose();
      } catch (error) {
        console.error("Error al enviar el producto:", error);
        alert("Error al enviar el producto. Revisa consola.");
      }
    },
  });

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const archivosArray = Array.from(files);
    const archivosValidos = archivosArray.filter(
      (file) => file.size <= MAX_IMAGE_SIZE
    );

    if (archivosValidos.length < archivosArray.length) {
      alert(
        "Algunas imágenes fueron descartadas por superar el tamaño máximo de 5MB."
      );
    }

    formik.setFieldTouched("imagenes", true, true);
    formik.setFieldValue("imagenes", [
      ...formik.values.imagenes,
      ...archivosValidos,
    ]);
    const nuevasUrls = archivosValidos.map((file) => URL.createObjectURL(file));
    setImagenesPreview((prev) => [...prev, ...nuevasUrls]);
  };

  const imagenPrincipal =
    imagenesPreview.length > 0
      ? imagenesPreview[imagenesPreview.length - 1]
      : null;
  const imagenesSecundarias = imagenesPreview.slice(0, -1);

  const handleSetAsPrincipal = (urlClickeada: string) => {
    setImagenesPreview((prev) => {
      const nuevoOrden = prev.filter((url) => url !== urlClickeada);
      nuevoOrden.push(urlClickeada);
      return nuevoOrden;
    });
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
      <div className={styles.content}>
        <h2 className={styles.title}>Crear producto</h2>

        <div className={styles.uploadContainer}>
          <label htmlFor="imageUpload" className={styles.imageUpload}>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagenChange}
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
            {imagenesSecundarias.map((url) => (
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
        {formik.touched.imagenes &&
          typeof formik.errors.imagenes === "string" && (
            <small className={styles.error}>{formik.errors.imagenes}</small>
          )}

        <div className={styles.input}>
          <input
            type="text"
            placeholder="Nombre"
            {...formik.getFieldProps("nombre")}
          />
        </div>
        {formik.touched.nombre && formik.errors.nombre && (
          <small className={styles.error}>{formik.errors.nombre}</small>
        )}
        <div className={styles.input}>
          <input
            type="number"
            placeholder="Precio"
            {...formik.getFieldProps("precio")}
          />
        </div>
        {formik.touched.precio && formik.errors.precio && (
          <small className={styles.error}>{formik.errors.precio}</small>
        )}
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Descripción"
            {...formik.getFieldProps("descripcion")}
          />
        </div>
        {formik.touched.descripcion && formik.errors.descripcion && (
          <small className={styles.error}>{formik.errors.descripcion}</small>
        )}
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Color"
            {...formik.getFieldProps("color")}
          />
        </div>
        {formik.touched.color && formik.errors.color && (
          <small className={styles.error}>{formik.errors.color}</small>
        )}
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Marca"
            {...formik.getFieldProps("marca")}
          />
        </div>
        {formik.touched.marca && formik.errors.marca && (
          <small className={styles.error}>{formik.errors.marca}</small>
        )}

        <select {...formik.getFieldProps("tipoId")}>
          <option value="" disabled>
            Selecciona un tipo
          </option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </option>
          ))}
        </select>
        {formik.touched.tipoId && formik.errors.tipoId && (
          <small className={styles.error}>{formik.errors.tipoId}</small>
        )}

        <div className={styles.categoriasScroll}>
          <div className={styles.checkboxGroup} role="group">
            <h4 className={styles.groupTitle}>Categorías</h4>
            {categorias.map((cat) => (
              <label key={cat.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="categoriaIds"
                  value={cat.id}
                  checked={formik.values.categoriaIds.includes(cat.id)}
                  onChange={(e) => {
                    const id = parseInt(e.target.value);
                    if (e.target.checked) {
                      formik.setFieldValue("categoriaIds", [
                        ...formik.values.categoriaIds,
                        id,
                      ]);
                    } else {
                      formik.setFieldValue(
                        "categoriaIds",
                        formik.values.categoriaIds.filter((cid) => cid !== id)
                      );
                    }
                  }}
                />
                {cat.nombre}
              </label>
            ))}
          </div>
        </div>
        {formik.touched.categoriaIds &&
          typeof formik.errors.categoriaIds === "string" && (
            <small className={styles.error}>{formik.errors.categoriaIds}</small>
          )}

        <div className={styles.buttonsContainer}>
          <button type="button" className="button-black" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="submit"
            className="button-black"
            disabled={formik.isSubmitting || !formik.dirty}
          >
            {formik.isSubmitting ? "Enviando..." : "Aceptar"}
          </button>
        </div>
      </div>
    </form>
  );
};
