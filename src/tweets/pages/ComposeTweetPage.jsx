import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useToast } from '../../ui/hooks/useToast'
import { createTweet, MAX_TWEET_LENGTH } from '../services/tweetService'
import { UserAvatar } from '../../users/components/UserAvatar'
import { TweetCharacterCounter } from '../components/TweetCharacterCounter'
import './composeTweetPage.css'

const publishErrorMessages = {
	'tweet/empty-body': 'Escribe algo antes de publicar.',
	'tweet/body-too-long': `El tweet no puede superar los ${MAX_TWEET_LENGTH} caracteres.`,
}

const getPublishErrorMessage = (publishError) => {
	return publishErrorMessages[publishError.message] ?? 'No se pudo publicar el tweet. Intenta de nuevo.'
}

export const ComposeTweetPage = () => {
	const navigate = useNavigate()
	const { currentUser } = useAuth()
	const { showToast } = useToast()
	const [tweetBody, setTweetBody] = useState('')
	const [isPublishing, setIsPublishing] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const characterCount = tweetBody.trim().length
	const isBodyTooLong = characterCount > MAX_TWEET_LENGTH
	const canPublish = characterCount > 0 && !isBodyTooLong && !isPublishing

	const handleBodyChange = (event) => {
		setTweetBody(event.target.value)
		setErrorMessage('')
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setIsPublishing(true)
		try {
			await createTweet(currentUser.id, tweetBody)
			showToast('Tu tweet fue publicado.')
			navigate(`/users/${currentUser.username}`)
		} catch (publishError) {
			setErrorMessage(getPublishErrorMessage(publishError))
			setIsPublishing(false)
		}
	}

	return (
		<section className="compose-page">
			<header className="compose-page__top-bar">
				<h1 className="compose-page__title">Publicar tweet</h1>
			</header>
			<form className="compose-form" onSubmit={handleSubmit}>
				<UserAvatar
					fullName={currentUser.fullName}
					username={currentUser.username}
					avatarUrl={currentUser.avatarUrl}
					size={48}
				/>
				<div className="compose-form__content">
					<label htmlFor="tweet-body" className="compose-form__label">
						Contenido del tweet
					</label>
					<textarea
						id="tweet-body"
						className="compose-form__textarea"
						value={tweetBody}
						onChange={handleBodyChange}
						placeholder="¿Qué está pasando?"
						rows={5}
						aria-describedby="tweet-character-counter"
						aria-invalid={isBodyTooLong}
						autoFocus
					/>
					{errorMessage && (
						<p className="compose-form__error" role="alert">
							{errorMessage}
						</p>
					)}
					<div className="compose-form__footer">
						<TweetCharacterCounter characterCount={characterCount} />
						<button type="submit" className="compose-form__button" disabled={!canPublish}>
							{isPublishing ? 'Publicando…' : 'Publicar'}
						</button>
					</div>
				</div>
			</form>
		</section>
	)
}