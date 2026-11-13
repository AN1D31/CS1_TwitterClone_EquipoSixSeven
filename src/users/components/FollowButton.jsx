import { useState } from 'react'
import { followUser } from '../services/followService'

// followService throws errors with these codes; the user sees them in Spanish.
const followErrorMessages = {
	'follow/already-following': 'Ya sigues a este usuario.',
	'follow/cannot-follow-yourself': 'No puedes seguirte a ti mismo.',
}

const getFollowErrorMessage = (followError) =>
	followErrorMessages[followError.message] ?? 'No se pudo seguir al usuario. Intenta de nuevo.'

// "[Seguir]" button. Calls the follow service and notifies the parent when it succeeds.
export const FollowButton = ({ followerId, targetUserId, onFollowed }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)

	const handleClick = async () => {
		setIsSubmitting(true)
		setErrorMessage(null)
		try {
			await followUser(followerId, targetUserId)
			onFollowed?.(targetUserId)
		} catch (followError) {
			setErrorMessage(getFollowErrorMessage(followError))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="follow-button">
			<button type="button" className="follow-button__button" onClick={handleClick} disabled={isSubmitting}>
				{isSubmitting ? 'Siguiendo…' : 'Seguir'}
			</button>
			{errorMessage && <span className="follow-button__error">{errorMessage}</span>}
		</div>
	)
}
