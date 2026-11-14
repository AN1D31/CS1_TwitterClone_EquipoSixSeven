import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useDataVersion } from '../../ui/hooks/useDataVersion'
import { useToast } from '../../ui/hooks/useToast'
import { getLikeSummary, likeTweet, unlikeTweet } from '../services/likeService'
import './tweetActions.css'

const WATCHED_KINDS = ['likes']

const emptySummary = { likeCount: 0, isLikedByViewer: false }

const buildNextSummary = ({ likeCount, isLikedByViewer }) => {
	return {
		likeCount: isLikedByViewer ? likeCount - 1 : likeCount + 1,
		isLikedByViewer: !isLikedByViewer,
	}
}

export const LikeButton = ({ tweetId }) => {
	const { currentUser } = useAuth()
	const { showToast } = useToast()
	const viewerId = currentUser?.id ?? null
	const [summary, setSummary] = useState(emptySummary)
	const [isSaving, setIsSaving] = useState(false)
	const likesVersion = useDataVersion(WATCHED_KINDS)

	useEffect(() => {
		let isActive = true
		const updateIfActive = (loadedSummary) => {
			if (isActive) setSummary(loadedSummary)
		}

		getLikeSummary(tweetId, viewerId)
			.then(updateIfActive)
			.catch((loadError) => console.error('Error loading likes:', loadError))

		return () => {
			isActive = false
		}
	}, [tweetId, viewerId, likesVersion])

	const handleToggleLike = async () => {
		setIsSaving(true)
		try {
			if (summary.isLikedByViewer) {
				await unlikeTweet(tweetId, viewerId)
			} else {
				await likeTweet(tweetId, viewerId)
			}
			setSummary(buildNextSummary)
		} catch (toggleError) {
			console.error('Error updating like:', toggleError)
			showToast('No se pudo actualizar el me gusta. Intenta de nuevo.', 'error')
		} finally {
			setIsSaving(false)
		}
	}

	const { likeCount, isLikedByViewer } = summary
	const buttonClassName = isLikedByViewer
		? 'tweet-action__button tweet-action__button--liked'
		: 'tweet-action__button'

	return (
		<div className="tweet-action">
			<button
				type="button"
				className={buttonClassName}
				onClick={handleToggleLike}
				disabled={isSaving || !viewerId}
				aria-pressed={isLikedByViewer}
				aria-label={isLikedByViewer ? 'Quitar me gusta' : 'Me gusta'}
			>
				{isLikedByViewer ? '♥' : '♡'}
			</button>
			{likeCount > 0 && (
				<Link
					to={`/tweets/${tweetId}/likes`}
					className="tweet-action__count"
					aria-label={`Ver a quienes les gusta (${likeCount})`}
				>
					{likeCount}
				</Link>
			)}
		</div>
	)
}