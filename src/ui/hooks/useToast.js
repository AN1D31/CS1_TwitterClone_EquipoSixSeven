import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'

// Returns { showToast }. Usage: showToast('Tweet publicado') or showToast('Error', 'error').
export const useToast = () => {
	return useContext(ToastContext)
}