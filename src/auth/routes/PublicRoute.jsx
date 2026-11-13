import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Login and register are only for visitors. A logged user goes to the home page.
export const PublicRoute = ({ children }) => {
	const { isLoggedIn } = useAuth()

	if (isLoggedIn) {
		return <Navigate to="/" replace />
	}

	return children
}