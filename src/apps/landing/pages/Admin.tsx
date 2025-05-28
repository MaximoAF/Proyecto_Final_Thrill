import { Aside } from "../components/AsideAdmin"
import { HeaderAdmin } from "../components/HeaderAdmin"
import styles from "../styles/Admin.module.css"
export const Admin = () => {
  return (
    <div className="aside-main__container">
      <Aside/>
      <div className={styles.main}>
        <HeaderAdmin/>
        <div className={styles.container}>
        <h3>Bienvenido al modo administrador de thrill clthes</h3>
        </div>
      </div>
    </div>
  )
}