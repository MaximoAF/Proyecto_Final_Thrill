import { Aside } from './AsideAdmin'
import { HeaderAdmin } from './HeaderAdmin'
import styles from './../styles/UsuariosAdmin.module.css'

export const UsuariosAdmin = () => {
  return (
    <div className="aside-mainContainer">
      <Aside />
      <div className={styles.main}>
        <HeaderAdmin/>
      </div>
    </div>
  )
}
