import { useCallback, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useAsyncData } from '../hooks/useAsyncData'
import { useAuth } from '../../auth/hooks/useAuth'
import { useDataVersion } from '../../ui/hooks/useDataVersion'
import { getUserByUsername } from '../services/userService'
import { normalizeUsername } from '../utils/normalizeUsername'
import { getFollowCountsByUserId, isUserFollowing } from '../services/followService'
import { getAuthoredTweetsByUserId, getRepostedTweetsByUserId, getTweetsByUserId } from '../../tweets/services/tweetService'
import { BackHeader } from '../components/BackHeader'
import { FollowButton } from '../components/FollowButton'
import { FollowCounts } from '../components/FollowCounts'
import { Loader, StatusMessage } from '../components/StatusMessage'
import { UserAvatar } from '../components/UserAvatar'
import { UserTweetList } from '../components/UserTweetList'
import { ChangeAvatarButton } from '../components/ChangeAvatarButton'
import '../users.css'

const WATCHED_KINDS = ['tweets', 'reposts', 'follows']

const checkViewerFollows = (viewerId, profileUserId) =>
	viewerId ? isUserFollowing(viewerId, profileUserId) : Promise.resolve(false)

const profileTabs = {
	all: {
		path: '',
		label: 'Todo',
		loadTweets: getTweetsByUserId,
		countLabel: 'publicaciones',
		emptyMessage: 'Este usuario todavía no ha publicado ni reposteado nada.',
	},
	tweets: {
		path: '/tweets',
		label: 'Tweets',
		loadTweets: getAuthoredTweetsByUserId,
		countLabel: 'tweets',
		emptyMessage: 'Este usuario todavía no ha publicado tweets.',
	},
	reposts: {
		path: '/reposts',
		label: 'Reposts',
		loadTweets: getRepostedTweetsByUserId,
		countLabel: 'reposts',
		emptyMessage: 'Este usuario todavía no ha reposteado nada.',
	},
}

const getTabClassName = ({ isActive }) => {
	return isActive ? 'user-tabs__item user-tabs__item--active' : 'user-tabs__item'
}

const ProfileTabs = ({ username }) => (
	<nav className="user-tabs" aria-label="Contenido del perfil">
		{Object.values(profileTabs).map((tab) => (
			<NavLink
				key={tab.label}
				to={`/users/${username}${tab.path}`}
				end
				className={getTabClassName}
			>
				{tab.label}
			</NavLink>
		))}
	</nav>
)

const loadProfile = async (username, viewerId, tab) => {
	const profileUser = await getUserByUsername(normalizeUsername(username))
	if (!profileUser) return { profileUser: null }

	const [tweets, counts, isFollowed] = await Promise.all([
		profileTabs[tab].loadTweets(profileUser.id),
		getFollowCountsByUserId(profileUser.id),
		checkViewerFollows(viewerId, profileUser.id),
	])
	return { profileUser, tweets, counts, isFollowed }
}

const ProfileAction = ({
	isOwnProfile,
	isFollowed,
	viewerId,
	profileUserId,
	hasAvatar,
	onFollowed,
	onAvatarChanged,
}) => {
	if (!viewerId) return null
	if (isOwnProfile) {
		return (
			<div className="profile__actions">
				<span className="user-badge">Tu perfil</span>
				<ChangeAvatarButton
					userId={viewerId}
					hasAvatar={hasAvatar}
					onAvatarChanged={onAvatarChanged}
				/>
			</div>
		)
	}
	if (isFollowed) return <span className="user-badge">Siguiendo</span>
	return <FollowButton followerId={viewerId} targetUserId={profileUserId} onFollowed={onFollowed} />
}

const UserProfile = ({ username, tab }) => {
	const { currentUser, login } = useAuth()
	const viewerId = currentUser?.id ?? null
	const [reloadCount, setReloadCount] = useState(0)
	const dataVersion = useDataVersion(WATCHED_KINDS)
	const loadUserProfile = useCallback(
		() => loadProfile(username, viewerId, tab, reloadCount, dataVersion),
		[username, viewerId, tab, reloadCount, dataVersion],
	)
	const { result: profile, isLoading, error } = useAsyncData(loadUserProfile)

	if (isLoading) return <Loader />
	if (error) return <StatusMessage type="error">No se pudo cargar el perfil: {error}</StatusMessage>
	if (!profile?.profileUser) return <StatusMessage type="error">No existe el usuario @{username}.</StatusMessage>

	const { profileUser, tweets, counts, isFollowed } = profile
	const reloadProfile = () => setReloadCount((previousCount) => previousCount + 1)

	const handleAvatarChanged = (updatedUser) => {
		login(updatedUser)
		reloadProfile()
	}

	return (
		<div className="users-feature">
			<BackHeader title={profileUser.fullName} subtitle={`${tweets.length} ${profileTabs[tab].countLabel}`} showBack />
			<section className="profile">
				<div className="profile__banner" />
				<div className="profile__top">
					<UserAvatar fullName={profileUser.fullName} username={profileUser.username} avatarUrl={profileUser.avatarUrl} size={96} />
					<ProfileAction
						isOwnProfile={viewerId === profileUser.id}
						isFollowed={isFollowed}
						viewerId={viewerId}
						profileUserId={profileUser.id}
						hasAvatar={Boolean(profileUser.avatarUrl)}
						onFollowed={reloadProfile}
						onAvatarChanged={handleAvatarChanged}
					/>
				</div>
				<h2 className="profile__name">{profileUser.fullName}</h2>
				<p className="profile__username">@{profileUser.username}</p>
				<FollowCounts username={profileUser.username} counts={counts} />
			</section>
			<ProfileTabs username={profileUser.username} />
			<UserTweetList tweets={tweets} emptyMessage={profileTabs[tab].emptyMessage} />
		</div>
	)
}

export const UserTweetsPage = ({ tab = 'all' }) => {
	const { username } = useParams()
	return <UserProfile key={`${username}-${tab}`} username={username} tab={tab} />
}
