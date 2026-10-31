import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/hooks/useAuth'
import { getFollowCountsByUserId } from '../users/services/followService'
import { useAsyncData } from '../users/hooks/useAsyncData'
import { FollowCounts } from '../users/components/FollowCounts'
import { UserAvatar } from '../users/components/UserAvatar'
import './homePage.css'

export const HomePage = () => {
	const { currentUser } = useAuth()
	const loadFollowCounts = useCallback(
		() => getFollowCountsByUserId(currentUser.id),
		[currentUser.id],
	)
	const { result: followCounts } = useAsyncData(loadFollowCounts)

	return (
		<section className="home-page">
			<header className="home-page__top-bar">
				<h1 className="home-page__title">Inicio</h1>
			</header>
			<div className="home-page__profile">
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
			</div>
			<FollowCounts username={currentUser.username} counts={followCounts} />
			<div className="home-page__compose">
				<p className="home-page__compose-text">¿Qué está pasando?</p>
				<Link to="/tweets/compose" className="home-page__tweet-link">
					Tweet
				</Link>
			</div>
		</section>
	)
}