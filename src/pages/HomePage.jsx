import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/hooks/useAuth'
import { getFollowCountsByUserId } from '../users/services/followService'
import { useAsyncData } from '../users/hooks/useAsyncData'
import { FollowCounts } from '../users/components/FollowCounts'
import { UserAvatar } from '../users/components/UserAvatar'
import { UserSearch } from '../users/components/UserSearch'
import './homePage.css'

// Shortcuts from the home page to the user's own profile, following and followers pages.
const buildShortcuts = (username, followCounts) => [
	{ path: `/users/${username}`, title: 'Mi perfil', detail: 'Tus tweets' },
	{ path: `/users/${username}/following`, title: 'Seguidos', detail: `${followCounts?.following ?? 0} usuarios` },
	{ path: `/users/${username}/followers`, title: 'Seguidores', detail: `${followCounts?.followers ?? 0} usuarios` },
]

export const HomePage = () => {
	const { currentUser } = useAuth()
	const loadFollowCounts = useCallback(
		() => getFollowCountsByUserId(currentUser.id),
		[currentUser.id],
	)
	const { result: followCounts } = useAsyncData(loadFollowCounts)
	const profilePath = `/users/${currentUser.username}`
	const shortcuts = buildShortcuts(currentUser.username, followCounts)

	return (
		<section className="home-page">
			<header className="home-page__top-bar">
				<h1 className="home-page__title">Inicio</h1>
			</header>
			<UserSearch />
			<div className="home-page__profile">
				<Link to={profilePath} className="home-page__profile-link">
					<UserAvatar
						fullName={currentUser.fullName}
						username={currentUser.username}
						avatarUrl={currentUser.avatarUrl}
						size={64}
					/>
					<div>
						<p className="home-page__name">Hola, {currentUser.fullName}</p>
						<p className="home-page__username">@{currentUser.username}</p>
					</div>
				</Link>
				<Link to={profilePath} className="home-page__profile-button">
					Ver perfil
				</Link>
			</div>
			<FollowCounts username={currentUser.username} counts={followCounts} />
			<nav className="home-page__shortcuts" aria-label="Accesos rápidos">
				{shortcuts.map((shortcut) => (
					<Link key={shortcut.path} to={shortcut.path} className="home-page__shortcut">
						<strong>{shortcut.title}</strong>
						<span>{shortcut.detail}</span>
					</Link>
				))}
			</nav>
			<div className="home-page__compose">
				<p className="home-page__compose-text">¿Qué está pasando?</p>
				<Link to="/tweets/compose" className="home-page__tweet-link">
					Tweet
				</Link>
			</div>
		</section>
	)
}
