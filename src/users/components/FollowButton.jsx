import { useState } from 'react'
import { followUser } from '../services/followService'

// "[Seguir]" button. Calls the follow service and notifies the parent when it succeeds.
export const FollowButton = ({ followerId, targetUserId, onFollowed }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState(null)

	const handleClick = async () => {
		setIsSubmitting(true)
		const result = await followUser(followerId, targetUserId)
		setIsSubmitting(false)

		if (!result.ok) {
			setError(result.error)
			return
		}
		onFollowed?.(targetUserId)
	}

	return (
		<div className="follow-button">
			<button type="button" className="follow-button__button" onClick={handleClick} disabled={isSubmitting}>
				{isSubmitting ? 'Siguiendo…' : 'Seguir'}
			</button>
			{error && <span className="follow-button__error">{error}</span>}
		</div>
	)
}
