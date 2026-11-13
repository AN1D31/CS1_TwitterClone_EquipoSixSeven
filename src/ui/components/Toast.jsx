import { useEffect } from 'react'

const TOAST_DURATION_MS = 4000

// One notification. It closes by itself after a few seconds or with its close button.
export const Toast = ({ toast, onClose }) => {
	const isError = toast.type === 'error'

	useEffect(() => {
		const closeTimerId = setTimeout(() => onClose(toast.id), TOAST_DURATION_MS)
		return () => clearTimeout(closeTimerId)
	}, [toast.id, onClose])

	return (
		<div className={`toast toast--${toast.type}`} role={isError ? 'alert' : 'status'}>
			<p className="toast__message">{toast.message}</p>
			<button
				type="button"
				className="toast__close"
				onClick={() => onClose(toast.id)}
				aria-label="Cerrar notificación"
			>
				×
			</button>
		</div>
	)
}