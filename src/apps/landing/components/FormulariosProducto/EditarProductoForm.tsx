import styles from "../../styles/FormProducto/CrearProducto.module.css";
import { FC, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { handleImageUpload } from "./UploadImage";
import { IProducto } from "../../../../types/IProducto";

interface IEditarProductoProps {
  onClose: () => void;
  producto: IProducto;
}

export const EditarProductoForm: FC<IEditarProductoProps> = ({ onClose }) => {
  const [imagenesPreview, setImagenesPreview] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      stock: "",
      promotion: "Promocion",
      images: [] as File[],
    },
    validationSchema: yup.object({
      name: yup.string().required("Nombre requerido"),
      price: yup
        .number()
        .typeError("Precio inválido")
        .positive("Debe ser positivo")
        .required("Precio requerido"),
      stock: yup
        .number()
        .typeError("Stock inválido")
        .integer("Debe ser un número entero")
        .required("Stock requerido"),
        promotion: yup.string().required("Promoción es requerida"),
      images: yup.array().min(1, "Debe subir al menos una imagen"),
    }),
    onSubmit: async (values) => {
      try {
        const urls = await handleImageUpload(values.images); 
        console.log("URLs subidas:", urls); 


        const producto = {
          name: values.name,
          price: values.price,
          stock: values.stock,
          promotion: values.promotion,
          images: urls,
        };

        console.log("Producto final:", producto);
        onClose();
      } catch (error) {
        console.error("Error subiendo imágenes:", error);
      }
    },
  });

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const archivosArray = Array.from(files);

    formik.setFieldValue("images", [...formik.values.images, ...archivosArray]);

    const nuevasUrls = archivosArray.map((file) => URL.createObjectURL(file));

    setImagenesPreview((prev) => [...prev, ...nuevasUrls]);
  };

  const imagenPrincipal =
    imagenesPreview.length > 0
      ? imagenesPreview[imagenesPreview.length - 1]
      : null;
  const imagenesPequenas = imagenesPreview.slice(0, -1);

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.content}>
        <h2 className={styles.title}>Editar producto</h2>

        <div className={styles.input}>
          <div
            className={styles.uploadContainer}
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
          >
            <label
              className={styles.imageUpload}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagenChange}
                style={{ display: "none" }}
              />

              {imagenPrincipal ? (
                <img
                  src={imagenPrincipal}
                  alt="imagen principal"
                  className={styles.previewImage}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid #333",
                  }}
                />
              ) : (
                <i
                  className="fa-solid fa-arrow-up-from-bracket"
                  style={{ fontSize: "3rem", color: "#666" }}
                ></i>
              )}
            </label>

            <div
              className={styles.previewImagesContainer}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {imagenesPequenas.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`preview pequeña ${i + 1}`}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setImagenesPreview((prev) => {
                      const newArray = [...prev];
                      newArray.splice(i, 1);
                      newArray.push(url);
                      return newArray;
                    });
                  }}
                />
              ))}
            </div>
          </div>

          {formik.errors.images && typeof formik.errors.images === "string" && (
            <small className={styles.error}>{formik.errors.images}</small>
          )}
        </div>

        <input
          type="text"
          placeholder="Nombre: "
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <small className={styles.error}>{formik.errors.name}</small>
        )}

        <input
          type="number"
          placeholder="Precio: "
          {...formik.getFieldProps("price")}
        />
        {formik.touched.price && formik.errors.price && (
          <small className={styles.error}>{formik.errors.price}</small>
        )}

        <input
          type="number"
          placeholder="Stock: "
          {...formik.getFieldProps("stock")}
        />
        {formik.touched.stock && formik.errors.stock && (
          <small className={styles.error}>{formik.errors.stock}</small>
        )}

        <select
          {...formik.getFieldProps("promotion")}
          className={
            formik.touched.promotion && formik.errors.promotion
              ? styles.errorInput
              : ""
          }
        >
          <option value="Promocion" disabled>
            Agregar Promoción
          </option>
          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="15">15%</option>
          <option value="20">20%</option>
        </select>
        {formik.touched.promotion && formik.errors.promotion && (
          <small className={styles.error}>{formik.errors.promotion}</small>
        )}
      </div>

      <div className={styles.buttonsContainer}>
        <button type="button" className="button-black" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="button-black">
          Aceptar
        </button>
      </div>
    </form>
  );
};
