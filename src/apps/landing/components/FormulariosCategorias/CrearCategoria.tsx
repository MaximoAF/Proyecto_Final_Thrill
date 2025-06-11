import styles from "../../styles/FormProducto/CrearProducto.module.css";
import { FC, useState } from "react";

interface ICrearCategoriaProps {
  onClose: ()=> void
}


export const CrearCategoria: FC<ICrearCategoriaProps> = ({onClose}) => {

  const [name, setName] = useState("")



  return (
    <form className={styles.form}>
        <div className={styles.content}>
        <h2 className={styles.title}>Crear Categoria</h2>
        </div>
        <div className={styles.input}>
        <input type="text" placeholder="Nombre: "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>
          <div className={styles.buttonsContainer}>
          <button className="button-black" onClick={()=>onClose()}>Cancelar</button>
          <button className="button-black">Aceptar</button>
          </div>
      </form>
  )
}
