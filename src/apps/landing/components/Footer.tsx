import styles from "../styles/Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.notification}>
        <div className={styles.notificationTitleContainer}>
          <h2 className={styles.notificationTitle}>
            Estate atento a todo lo nuevo que se viene
          </h2>
        </div>
        <div className={styles.containerInputs}>
          <div className={styles.input}>
            <div className={styles.icon}>
              <i className="fa-regular fa-envelope"></i>
            </div>
            <input type="text" placeholder=" Ingrese su direccion de E-mail:" />
          </div>
          <button className={styles.button}>Subscribe to Newsletter</button>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.infoContent}>
          <div className={styles.imgContainer}>
            <img src="thrill_logo-dark.svg" alt="Thrill" />
          </div>
          <p>Seguinos en nuestras redes sociales para enterarte de todo.</p>
        </div>

        <div className={styles.socialMedias}>
          <a
            href="https://www.instagram.com/thrill.clthes/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.socialIcon}>
              <i className="fa-brands fa-instagram"></i>
            </button>
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.socialIconFB}>
              <i className="fa-brands fa-facebook-f"></i>
            </button>
          </a>

          <a
            href="https://wa.me/c/5492616368951"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.socialIcon}>
              <i className="fa-brands fa-whatsapp"></i>
            </button>
          </a>
        </div>
      </div>
      <div className={styles.separator}></div>
      <div>
        <p className={styles.copyrigth}>
          thrill clothes © 2000-2023, All Rights Reserved
        </p>
      </div>
    </div>
  );
};
