import { FC } from "react"
import { IArticulo } from "../../../../types/IArticulo"
import styles from '../../styles/cart/ProductCart.module.css'

interface IProductCartProps{
  product: IArticulo
}

export const ProductCart:FC<IProductCartProps> = ({product}) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}><img src={product.imgs[0]} alt="" /></div>
        <div className={styles.valorContainer}>
          <div>
            <p className={styles.title}>{product.titulo}</p>
            <p>Color: <span className={styles.gray}>color</span></p>
            <p>Size: <span className={styles.gray}>L</span></p>
          </div>
          <p className={styles.price}>${product.precio}</p>
        </div>
      </div>
      <div className={styles.buttonsFlex}>
        <div className={styles.trashButton}>
          <div className="i-btn">
            <i className="fa-regular fa-trash-can"></i>
          </div>
        </div>
        <div className={styles.cuantity}>
          <div className="i-btn">
            <i className="fa-solid fa-minus"></i>
          </div>
          <p><b>1</b></p>
          <div className="i-btn">
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
  )
}
