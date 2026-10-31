import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
	loginWithGoogle,
	loginWithUsernameAndPassword,
} from '../services/authService'
import { useAuth } from '../hooks/useAuth'
import { AuthField } from '../components/AuthField'
import './authPages.css'

const initialLoginForm = {
	username: '',
	password: '',
}

const loginErrorMessages = {
	'auth/user-not-found': 'No existe un usuario con ese nombre de usuario.',
	'auth/wrong-password': 'La contraseña es incorrecta.',
	'auth/popup-closed-by-user': 'Cerraste la ventana de Google antes de terminar.',
	'auth/too-many-requests': 'Demasiados intentos. Espera un momento e intenta de nuevo.',
}

const getLoginErrorMessage = (error) => {
	return loginErrorMessages[error.message] ?? 'No se pudo iniciar sesión. Intenta de nuevo.'
}

export const LoginPage = () => {
	const navigate = useNavigate()
	const { login } = useAuth()
	const [loginForm, setLoginForm] = useState(initialLoginForm)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setLoginForm({ ...loginForm, [name]: value })
	}

	const runLogin = async (loginAction) => {
		setIsLoading(true)
		setErrorMessage('')
		try {
			const loggedUser = await loginAction()
			login(loggedUser)
			navigate('/')
		} catch (error) {
			setErrorMessage(getLoginErrorMessage(error))
		} finally {
			setIsLoading(false)
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		runLogin(() =>
			loginWithUsernameAndPassword(loginForm.username, loginForm.password),
		)
	}

	const handleGoogleLogin = () => {
		runLogin(loginWithGoogle)
	}

	return (
		<main className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h1>Iniciar sesión</h1>

				<AuthField
					id="login-username"
					label="Nombre de usuario"
					name="username"
					type="text"
					autoComplete="username"
					value={loginForm.username}
					onChange={handleInputChange}
				/>
				<AuthField
					id="login-password"
					label="Contraseña"
					name="password"
					type="password"
					autoComplete="current-password"
					value={loginForm.password}
					onChange={handleInputChange}
				/>

				{errorMessage && <p className="auth-error" role="alert">{errorMessage}</p>}

				<button className="auth-button" type="submit" disabled={isLoading}>
					Entrar
				</button>
				<button
					className="auth-button auth-button-secondary"
					type="button"
					onClick={handleGoogleLogin}
					disabled={isLoading}
				>
					Continuar con Google
				</button>

				<p>
					¿No tienes cuenta? <Link to="/auth/register">Regístrate</Link>
				</p>
			</form>
		</main>
	)
}