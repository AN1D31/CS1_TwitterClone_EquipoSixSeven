import { useState } from 'react'
import { unfollowUser } from '../services/followService'

const unfollowErrorMessages = {
	'follow/not-following': 'Ya no sigues a este usuario.',
}

const getUnfollowErrorMessage = (unfollowError) =>
	unfollowErrorMessages[unfollowError.message] ??
	'No se pudo dejar de seguir al usuario. Intenta de nuevo.'

export const UnfollowButton = ({ followerId, targetUserId, onUnfollowed }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)

	const handleClick = async () => {
		setIsSubmitting(true)
		setErrorMessage(null)
		try {
			await unfollowUser(followerId, targetUserId)
			onUnfollowed?.(targetUserId)
		} catch (unfollowError) {
			console.error('Error unfollowing user:', unfollowError)
			setErrorMessage(getUnfollowErrorMessage(unfollowError))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="follow-button">
			<button
				type="button"
				className="unfollow-button"
				onClick={handleClick}
				disabled={isSubmitting}
				aria-label="Dejar de seguir"
			>
				<span className="unfollow-button__label">Siguiendo</span>
				<span className="unfollow-button__label unfollow-button__label--hover">Dejar de seguir</span>
			</button>
			{errorMessage && <span className="follow-button__error">{errorMessage}</span>}
		</div>
	)
}