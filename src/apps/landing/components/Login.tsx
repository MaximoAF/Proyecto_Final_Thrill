import { useState } from 'react';
import styles from '../styles/Login.module.css';

interface LoginData {
username: string;
password: string;
}

export const Login = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

return (
    <div className="overlay">
    <div className={styles.login_form}>
        <h3 className={styles.login_title}>Inicio de sesión</h3>
        <div className={styles.login_username}>
            <span className="material-symbols-outlined">
                mail
            </span>
            <input 
            type="text"
            placeholder=" Ingrese su direccion de E-mail:"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className={styles.login_password}>
            <span className="material-symbols-outlined">
                password
            </span>
            <input
            type="password"
            placeholder=" Ingrese su Contraseña:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className={styles.login_qr}>
        
        </div>
        <div className={styles.login_button}>
            <button onClick={() => console.log({ username, password })}>
            Iniciar sesión
            </button>
        </div>
    </div>
    </div>
);
};
console.log('hola')