
import styles from "../../styles/ingreso/modals/QRIngreso.module.css";

export const QRIngreso = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="thrill_logo-dark.svg" alt="thrill" />
      </div>
      <div className={styles.qrInstagram}>
        <img src="qr_thrill_IG.svg" alt="qr thrill" />
      </div>
    </div>
  )
}
