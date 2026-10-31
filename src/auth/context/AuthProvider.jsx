import { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from '../reducers/authReducer'
import { authActionTypes } from '../types/authActionTypes'

const SESSION_STORAGE_KEY = 'xCloneSessionUser'

const readStoredSessionUser = () => {
	try {
		const storedSessionUser = localStorage.getItem(SESSION_STORAGE_KEY)
		return storedSessionUser ? JSON.parse(storedSessionUser) : null
	} catch {
		return null
	}
}

const createInitialAuthState = () => {
	const sessionUser = readStoredSessionUser()
	return { isLoggedIn: sessionUser !== null, currentUser: sessionUser }
}

export const AuthProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, null, createInitialAuthState)

	const login = (user) => {
		localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
		dispatch({ type: authActionTypes.login, payload: user })
	}

	const logout = () => {
		localStorage.removeItem(SESSION_STORAGE_KEY)
		dispatch({ type: authActionTypes.logout })
	}

	return (
		<AuthContext.Provider value={{ ...authState, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}