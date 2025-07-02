import styles from '../styles/CategoriesGrid.module.css'
import imgShoes from '../../../assets/imgs/shoes.png'
import imgPants from '../../../assets/imgs/pants.png'
import imgSweaters from '../../../assets/imgs/sweaters.png'
import imgTshirts from '../../../assets/imgs/tshirt.png'

export const CategoriesGrid = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 >CATEGORIAS</h2>
      </div>
      <div className={styles.gridsContainer}>
        <div className={styles.grid1}>
          <div className={styles.imgContainer} style={{backgroundImage: `url(${imgSweaters})`}}>
            <p className={styles.categorieNames}>Abrigos</p>
          </div>
          <div className={styles.imgContainer} style={{backgroundImage: `url(${imgShoes})`, aspectRatio: '1/1'}}>
            <p className={styles.categorieNames}>Zapatillas</p>
          </div>
        </div>
        <div className={styles.grid2}>
          <div className={styles.imgContainer} style={{backgroundImage: `url(${imgTshirts})`, aspectRatio:'1/1'}}>
            <p className={styles.categorieNames}>Remeras</p>
          </div>
          <div className={styles.imgContainer} style={{backgroundImage: `url(${imgPants})`}}>
            <p className={styles.categorieNames}>Pantalones</p>
          </div>
        </div>
      </div>
    </div>
  )
}
