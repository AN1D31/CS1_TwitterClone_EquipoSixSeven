import { useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useToast } from '../../ui/hooks/useToast'
import { UserAvatar } from '../../users/components/UserAvatar'
import { addComment, MAX_COMMENT_LENGTH } from '../services/commentService'

const publishErrorMessages = {
	'comment/empty-body': 'Escribe algo antes de comentar.',
	'comment/body-too-long': `El comentario no puede superar los ${MAX_COMMENT_LENGTH} caracteres.`,
}

const getPublishErrorMessage = (publishError) => {
	return (
		publishErrorMessages[publishError.message] ??
		'No se pudo publicar el comentario. Intenta de nuevo.'
	)
}

export const CommentForm = ({ tweetId, onCommentAdded }) => {
	const { currentUser } = useAuth()
	const { showToast } = useToast()
	const [commentBody, setCommentBody] = useState('')
	const [isSaving, setIsSaving] = useState(false)

	const characterCount = commentBody.trim().length
	const canComment = characterCount > 0 && characterCount <= MAX_COMMENT_LENGTH && !isSaving

	const handleSubmit = async (event) => {
		event.preventDefault()
		setIsSaving(true)
		try {
			await addComment(tweetId, currentUser.id, commentBody)
			setCommentBody('')
			onCommentAdded()
		} catch (publishError) {
			console.error('Error adding comment:', publishError)
			showToast(getPublishErrorMessage(publishError), 'error')
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<form className="comment-form" onSubmit={handleSubmit}>
			<UserAvatar
				fullName={currentUser.fullName}
				username={currentUser.username}
				avatarUrl={currentUser.avatarUrl}
				size={40}
			/>
			<div className="comment-form__content">
				<label htmlFor="comment-body" className="compose-form__label">
					Escribe un comentario
				</label>
				<textarea
					id="comment-body"
					className="comment-form__textarea"
					value={commentBody}
					onChange={(event) => setCommentBody(event.target.value)}
					placeholder="Escribe tu respuesta"
					maxLength={MAX_COMMENT_LENGTH}
				/>
				<div className="comment-form__footer">
					<span className="comment-form__counter">
						{characterCount}/{MAX_COMMENT_LENGTH}
					</span>
					<button type="submit" className="comment-form__submit" disabled={!canComment}>
						{isSaving ? 'Comentando...' : 'Comentar'}
					</button>
				</div>
			</div>
		</form>
	)
}