import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { Loader, StatusMessage } from '../../users/components/StatusMessage'
import { useDataVersion } from '../../ui/hooks/useDataVersion'
import { getCommentsByTweetId } from '../services/commentService'
import { CommentForm } from './CommentForm'
import { CommentItem } from './CommentItem'
import './comments.css'

const WATCHED_KINDS = ['comments']

const EMPTY_COMMENTS_MESSAGE = 'Todavía no hay comentarios. ¡Sé el primero en comentar!'

export const CommentSection = ({ tweetId }) => {
	const { currentUser } = useAuth()
	const [comments, setComments] = useState(null)
	const [error, setError] = useState(null)
	const commentsVersion = useDataVersion(WATCHED_KINDS)

	useEffect(() => {
		let isActive = true

		getCommentsByTweetId(tweetId)
			.then((loadedComments) => isActive && setComments(loadedComments))
			.catch((loadError) => {
				console.error('Error loading comments:', loadError)
				if (isActive) setError(loadError.message)
			})

		return () => {
			isActive = false
		}
	}, [tweetId, commentsVersion])

	return (
		<section className="comment-section" aria-label="Comentarios">
			{currentUser && <CommentForm tweetId={tweetId} />}
			<h2 className="comment-section__title">Comentarios ({comments?.length ?? 0})</h2>
			{!comments && !error && <Loader />}
			{error && (
				<StatusMessage type="error">
					No se pudieron cargar los comentarios: {error}
				</StatusMessage>
			)}
			{comments && !comments.length && (
				<StatusMessage>{EMPTY_COMMENTS_MESSAGE}</StatusMessage>
			)}
			{comments && comments.length > 0 && (
				<ul className="comment-list">
					{comments.map((comment) => (
						<CommentItem key={comment.id} comment={comment} />
					))}
				</ul>
			)}
		</section>
	)
}