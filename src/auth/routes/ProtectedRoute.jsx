import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Pages inside the app require a session. Without one, the user goes to the login page.
export const ProtectedRoute = ({ children }) => {
	const { isLoggedIn } = useAuth()

	if (!isLoggedIn) {
		return <Navigate to="/auth/login" replace />
	}

	return children
}