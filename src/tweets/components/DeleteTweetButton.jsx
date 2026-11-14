import { useState } from 'react'
import { useToast } from '../../ui/hooks/useToast'
import { deleteTweet } from '../services/tweetService'
import './tweetActions.css'

const deleteErrorMessages = {
	'tweet/not-found': 'Este tweet ya no existe.',
	'tweet/not-author': 'Solo puedes eliminar tus propios tweets.',
}

const getDeleteErrorMessage = (deleteError) =>
	deleteErrorMessages[deleteError.message] ?? 'No se pudo eliminar el tweet. Intenta de nuevo.'

export const DeleteTweetButton = ({ tweetId, userId, onDeleted }) => {
	const { showToast } = useToast()
	const [isConfirming, setIsConfirming] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	const handleConfirm = async () => {
		setIsDeleting(true)
		try {
			await deleteTweet(tweetId, userId)
			showToast('Tweet eliminado.')
			onDeleted?.(tweetId)
		} catch (deleteError) {
			console.error('Error deleting tweet:', deleteError)
			showToast(getDeleteErrorMessage(deleteError), 'error')
			setIsDeleting(false)
			setIsConfirming(false)
		}
	}

	return (
		<div className="tweet-action tweet-action--delete">
			{!isConfirming && (
				<button
					type="button"
					className="tweet-action__button tweet-action__button--delete"
					onClick={() => setIsConfirming(true)}
					aria-label="Eliminar tweet"
					title="Eliminar tweet"
				>
					🗑
				</button>
			)}
			{isConfirming && (
				<div className="tweet-delete-confirm">
					<span className="tweet-delete-confirm__text">¿Eliminar este tweet?</span>
					<button
						type="button"
						className="tweet-delete-confirm__button tweet-delete-confirm__button--danger"
						onClick={handleConfirm}
						disabled={isDeleting}
					>
						{isDeleting ? 'Eliminando…' : 'Sí, eliminar'}
					</button>
					<button
						type="button"
						className="tweet-delete-confirm__button"
						onClick={() => setIsConfirming(false)}
						disabled={isDeleting}
					>
						Cancelar
					</button>
				</div>
			)}
		</div>
	)
}