import { AuthProvider } from './auth/context/AuthProvider'
import { ToastProvider } from './ui/context/ToastProvider'
import { AppRouter } from './routes/AppRouter'

export const XCloneApp = () => {
	return (
		<AuthProvider>
			<ToastProvider>
				<AppRouter />
			</ToastProvider>
		</AuthProvider>
	)
}