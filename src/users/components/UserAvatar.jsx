import { useState } from 'react'

const AVATAR_COLORS = ['#1d9bf0', '#7856ff', '#f91880', '#00ba7c', '#ff7a00', '#ffd400']

const getInitials = (fullName) =>
	fullName
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0].toUpperCase())
		.join('')

const pickColorByName = (name) => {
	const charCodeSum = [...name].reduce((sum, character) => sum + character.charCodeAt(0), 0)
	return AVATAR_COLORS[charCodeSum % AVATAR_COLORS.length]
}

// Shows the user's photo. If there is no photo or it fails to load, shows their initials.
export const UserAvatar = ({ fullName = '', username = '', avatarUrl = null, size = 40 }) => {
	const [hasImageFailed, setHasImageFailed] = useState(false)
	const style = { width: size, height: size, fontSize: size * 0.4 }

	if (avatarUrl && !hasImageFailed) {
		return <img className="user-avatar" src={avatarUrl} alt={fullName} style={style} onError={() => setHasImageFailed(true)} />
	}

	return (
		<span className="user-avatar" style={{ ...style, background: pickColorByName(username || fullName) }} aria-hidden="true">
			{getInitials(fullName)}
		</span>
	)
}
