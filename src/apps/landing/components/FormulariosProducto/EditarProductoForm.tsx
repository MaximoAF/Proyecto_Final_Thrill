import styles from "../../styles/FormProducto/CrearProducto.module.css";
import { FC, useState } from "react";

interface ICrearProductoProps {
  onClose: ()=> void
  
}

export const EditarProductoForm:FC<ICrearProductoProps> = ({onClose}) => {

  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagenPreview(url);
    }
  };

  return (
    <form className={styles.form}>
        <div className={styles.content}>
        <h2 className={styles.title}>Editar producto</h2>
        <div className={styles.input}>
        <div className={styles.uploadContainer}>
          <label className={styles.imageUpload}>
            <input type="file" accept="image/*" onChange={handleImagenChange} />
            {imagenPreview ? (
              <img src={imagenPreview} alt="preview" className={styles.previewImage} />
            ) : (
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
            )}
          </label>
        </div>
        <input type="text" placeholder="Nombre: "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="number" placeholder="Precio: " 
        value={price}
        onChange={(e) => setPrice(e.target.value)}  
        />
        <input type="number" placeholder="Stock: " 
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        />
          <select>
            <option  className={styles.option}value="Promocion" selected>
              Agregar Promoción
            </option>
            <option value="5">5%</option>
            <option value="10">10%</option>
            <option value="15">15%</option>
            <option value="20">20%</option>
          </select>
        </div>
          <div className={styles.buttonsContainer}>
          <button className="button-black" onClick={()=>onClose()}>Cancelar</button>
          <button className="button-black">Aceptar</button>
          </div>
        </div>
      </form>
  )
}
