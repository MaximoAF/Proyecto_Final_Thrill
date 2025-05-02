import styles from "../../styles/ingreso/modals/QRIngreso.module.css";
import thrillLogoBlack from '../../../../assets/svg/thrill_logo-dark.svg';
import thrillQR from '../../../../assets/svg/qr_thrill_IG.svg';

export const QRIngreso = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={thrillLogoBlack} alt="thrill" />
      </div>
      <div className={styles.qrInstagram}>
        <img src={thrillQR} alt="qr thrill" />
      </div>
    </div>
  )
}
