import { useCallback, useMemo, useState } from 'react'
import { ToastContext } from './ToastContext'
import { Toast } from '../components/Toast'
import '../components/toast.css'

const createToastId = () => `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`

// Shares showToast with the whole app and renders the visible notifications.
export const ToastProvider = ({ children }) => {
	const [visibleToasts, setVisibleToasts] = useState([])

	const closeToast = useCallback((toastId) => {
		setVisibleToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== toastId))
	}, [])

	const showToast = useCallback((message, type = 'success') => {
		const newToast = { id: createToastId(), message, type }
		setVisibleToasts((currentToasts) => [...currentToasts, newToast])
	}, [])

	const toastContextValue = useMemo(() => ({ showToast }), [showToast])

	return (
		<ToastContext.Provider value={toastContextValue}>
			{children}
			<div className="toast-region">
				{visibleToasts.map((toast) => (
					<Toast key={toast.id} toast={toast} onClose={closeToast} />
				))}
			</div>
		</ToastContext.Provider>
	)
}