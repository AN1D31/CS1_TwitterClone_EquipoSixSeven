import { AuthProvider } from './auth/context/AuthProvider'
import { AppRouter } from './routes/AppRouter'

export const XCloneApp = () => {
	return (
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	)
}