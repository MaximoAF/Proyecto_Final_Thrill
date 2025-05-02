import { useState } from "react";
import styles from "../../styles/ingreso/modals/Form.module.css";

interface RegisterProps {
  toggleForm: () => void;
}

export const Registro: React.FC<RegisterProps> = ({ toggleForm }) => {
	const [username, setUsername] = useState("");
		const [password, setPassword] = useState("");
		const [repeatPassword, setRepeatPassword] = useState("");
	
	return (
		<form className={styles.form}>
		<div className={styles.content}>
			<h3 className={styles.title}>Registrarse</h3>

			<div className={styles.input}>
				<div className={styles.icon}>
					<i className="fa-regular fa-envelope"></i>
				</div>
				<input
					type="text"
					placeholder="Ingrese un nombre de usuario:"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>

			<div className={styles.input}>
				<div className={styles.icon}>
					<i className="fa-solid fa-asterisk"></i>
				</div>
				<input
					type="password"
					placeholder="Ingrese una contraseña:"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div className={styles.input}>
				<div className={styles.icon}>
					<i className="fa-solid fa-asterisk"></i>
				</div>
				<input
					type="password"
					placeholder="Repita la contraseña:"
					value={repeatPassword}
					onChange={(e) => setRepeatPassword(e.target.value)}
				/>
			</div>
		</div>

		<div className='button-container'>
			<button
				className='button-black'
				onClick={(e) => {
					e.preventDefault();
					console.log("Registro", { username, password, repeatPassword });
				}}
			>
				Crear cuenta
			</button>
		</div>

		<p className={styles.registerText}>
			¿Ya tenés una cuenta?{" "}
			<span className={styles.link} onClick={toggleForm}>
				Iniciá sesión
			</span>
		</p>
	</form>
);
}