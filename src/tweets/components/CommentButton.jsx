import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCommentCount } from '../services/commentService'
import './tweetActions.css'

export const CommentButton = ({ tweetId }) => {
	const [commentCount, setCommentCount] = useState(0)

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
	}, [tweetId])

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