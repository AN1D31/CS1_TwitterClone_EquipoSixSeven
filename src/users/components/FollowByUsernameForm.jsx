import { useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useToast } from '../../ui/hooks/useToast'
import { getUserByUsername } from '../services/userService'
import { followUser } from '../services/followService'
import { normalizeUsername } from '../utils/normalizeUsername'
import './followByUsernameForm.css'

// Error codes thrown while following; the user sees them in Spanish.
const followErrorMessages = {
	'follow/empty-username': () => 'Escribe el nombre de usuario que quieres seguir.',
	'follow/user-not-found': (username) => `No existe el usuario @${username}.`,
	'follow/cannot-follow-yourself': () => 'No puedes seguirte a ti mismo.',
	'follow/already-following': (username) => `Ya sigues a @${username}.`,
}

const getFollowErrorMessage = (followError, username) => {
	const buildMessage = followErrorMessages[followError.message]
	return buildMessage ? buildMessage(username) : 'No se pudo seguir al usuario. Intenta de nuevo.'
}

const findUserToFollow = async (username) => {
	if (!username) throw new Error('follow/empty-username')
	const userToFollow = await getUserByUsername(username)
	if (!userToFollow) throw new Error('follow/user-not-found')
	return userToFollow
}

// Form to follow another user by their username, with or without "@".
export const FollowByUsernameForm = ({ onFollowed }) => {
	const { currentUser } = useAuth()
	const { showToast } = useToast()
	const [typedUsername, setTypedUsername] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleUsernameChange = (event) => {
		setTypedUsername(event.target.value)
		setErrorMessage('')
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const username = normalizeUsername(typedUsername)
		setIsSubmitting(true)
		setErrorMessage('')
		try {
			const userToFollow = await findUserToFollow(username)
			await followUser(currentUser.id, userToFollow.id)
			showToast(`Ahora sigues a @${userToFollow.username}.`)
			setTypedUsername('')
			onFollowed?.()
		} catch (followError) {
			// Logged so the real cause (e.g. Firestore permissions) is visible in the console.
			console.error('Error following user:', followError)
			setErrorMessage(getFollowErrorMessage(followError, username))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form className="follow-form" onSubmit={handleSubmit} noValidate>
			<label htmlFor="follow-username" className="follow-form__label">
				Seguir a un usuario
			</label>
			<div className="follow-form__row">
				<input
					id="follow-username"
					type="text"
					className="follow-form__input"
					value={typedUsername}
					onChange={handleUsernameChange}
					placeholder="@usuario"
					autoComplete="off"
					aria-invalid={Boolean(errorMessage)}
					aria-describedby="follow-username-error"
				/>
				<button type="submit" className="follow-form__button" disabled={isSubmitting}>
					{isSubmitting ? 'Siguiendo…' : 'Seguir'}
				</button>
			</div>
			{errorMessage && (
				<p id="follow-username-error" className="follow-form__error" role="alert">
					{errorMessage}
				</p>
			)}
		</form>
	)
}
