import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDataVersion } from '../../ui/hooks/useDataVersion'
import { getCommentCount } from '../services/commentService'
import './tweetActions.css'

const WATCHED_KINDS = ['comments']

export const CommentButton = ({ tweetId }) => {
	const [commentCount, setCommentCount] = useState(0)
	const commentsVersion = useDataVersion(WATCHED_KINDS)

	useEffect(() => {
		let isActive = true
		const updateIfActive = (loadedCount) => {
			if (isActive) setCommentCount(loadedCount)
		}

		getCommentCount(tweetId)
			.then(updateIfActive)
			.catch((loadError) => console.error('Error loading comments:', loadError))

		return () => {
			isActive = false
		}
	}, [tweetId, commentsVersion])

	return (
		<div className="tweet-action">
			<Link
				to={`/tweets/${tweetId}`}
				className="tweet-action__button tweet-action__button--comment"
				aria-label="Ver comentarios"
			>
				💬
			</Link>
			{commentCount > 0 && (
				<span className="tweet-action__count tweet-action__count--static">
					{commentCount}
				</span>
			)}
		</div>
	)
}