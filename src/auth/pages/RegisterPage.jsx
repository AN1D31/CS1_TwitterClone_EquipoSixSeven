import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import { AuthField } from '../components/AuthField'
import './authPages.css'

const MIN_PASSWORD_LENGTH = 6

const initialRegisterForm = {
	fullName: '',
	username: '',
	email: '',
	password: '',
}

const registerErrorMessages = {
	'auth/username-already-in-use': 'Ese nombre de usuario ya está en uso.',
	'auth/email-already-in-use': 'Ese correo electrónico ya está registrado.',
	'auth/invalid-email': 'El correo electrónico no es válido.',
	'auth/weak-password': 'La contraseña es muy débil.',
}

const getRegisterErrorMessage = (error) => {
	return registerErrorMessages[error.message] ?? 'No se pudo crear la cuenta. Intenta de nuevo.'
}

const validateRegisterForm = ({ username, password }) => {
	if (/\s/.test(username)) {
		return 'El nombre de usuario no puede tener espacios.'
	}
	if (password.length < MIN_PASSWORD_LENGTH) {
		return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`
	}
	return ''
}

export const RegisterPage = () => {
	const navigate = useNavigate()
	const [registerForm, setRegisterForm] = useState(initialRegisterForm)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setRegisterForm({ ...registerForm, [name]: value })
	}

	const submitRegistration = async () => {
		setIsLoading(true)
		try {
			await registerUser(registerForm)
			navigate('/auth/login')
		} catch (error) {
			setErrorMessage(getRegisterErrorMessage(error))
		} finally {
			setIsLoading(false)
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const validationMessage = validateRegisterForm(registerForm)
		setErrorMessage(validationMessage)
		if (validationMessage) {
			return
		}
		submitRegistration()
	}

	return (
		<main className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h1>Crear cuenta</h1>

				<AuthField
					id="register-full-name"
					label="Nombre completo"
					name="fullName"
					type="text"
					autoComplete="name"
					value={registerForm.fullName}
					onChange={handleInputChange}
				/>
				<AuthField
					id="register-username"
					label="Nombre de usuario"
					name="username"
					type="text"
					autoComplete="username"
					value={registerForm.username}
					onChange={handleInputChange}
				/>
				<AuthField
					id="register-email"
					label="Correo electrónico"
					name="email"
					type="email"
					autoComplete="email"
					value={registerForm.email}
					onChange={handleInputChange}
				/>
				<AuthField
					id="register-password"
					label="Contraseña"
					name="password"
					type="password"
					autoComplete="new-password"
					value={registerForm.password}
					onChange={handleInputChange}
				/>

				{errorMessage && <p className="auth-error" role="alert">{errorMessage}</p>}

				<button className="auth-button" type="submit" disabled={isLoading}>
					Registrarme
				</button>

				<p>
					¿Ya tienes cuenta? <Link to="/auth/login">Inicia sesión</Link>
				</p>
			</form>
		</main>
	)
}