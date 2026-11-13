import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAsyncData } from '../hooks/useAsyncData'
import { useAuth } from '../../auth/hooks/useAuth'
import { getUserByUsername } from '../services/userService'
import { normalizeUsername } from '../utils/normalizeUsername'
import { getFollowCountsByUserId, isUserFollowing } from '../services/followService'
import { getTweetsByUserId } from '../../tweets/services/tweetService'
import { BackHeader } from '../components/BackHeader'
import { FollowButton } from '../components/FollowButton'
import { FollowCounts } from '../components/FollowCounts'
import { Loader, StatusMessage } from '../components/StatusMessage'
import { UserAvatar } from '../components/UserAvatar'
import { UserTweetList } from '../components/UserTweetList'
import '../users.css'

// Without a logged user there is nobody to follow from, so the profile counts as not followed.
const checkViewerFollows = (viewerId, profileUserId) =>
	viewerId ? isUserFollowing(viewerId, profileUserId) : Promise.resolve(false)

const loadProfile = async (username, viewerId) => {
	const profileUser = await getUserByUsername(normalizeUsername(username))
	if (!profileUser) return { profileUser: null }

	const [tweets, counts, isFollowed] = await Promise.all([
		getTweetsByUserId(profileUser.id),
		getFollowCountsByUserId(profileUser.id),
		checkViewerFollows(viewerId, profileUser.id),
	])
	return { profileUser, tweets, counts, isFollowed }
}

const ProfileAction = ({ isOwnProfile, isFollowed, viewerId, profileUserId, onFollowed }) => {
	if (!viewerId) return null
	if (isOwnProfile) return <span className="user-badge">Tu perfil</span>
	if (isFollowed) return <span className="user-badge">Siguiendo</span>
	return <FollowButton followerId={viewerId} targetUserId={profileUserId} onFollowed={onFollowed} />
}

// Tweets of a user (newest first, 10 per page) with followers/following counters and "[Seguir]".
const UserProfile = ({ username }) => {
	const { currentUser } = useAuth()
	const viewerId = currentUser?.id ?? null
	const [reloadCount, setReloadCount] = useState(0)
	const loadUserProfile = useCallback(
		() => loadProfile(username, viewerId, reloadCount),
		[username, viewerId, reloadCount],
	)
	const { result: profile, isLoading, error } = useAsyncData(loadUserProfile)

	if (isLoading) return <Loader />
	if (error) return <StatusMessage type="error">No se pudo cargar el perfil: {error}</StatusMessage>
	if (!profile?.profileUser) return <StatusMessage type="error">No existe el usuario @{username}.</StatusMessage>

	const { profileUser, tweets, counts, isFollowed } = profile
	const reloadProfile = () => setReloadCount((previousCount) => previousCount + 1)

	return (
		<div className="users-feature">
			<BackHeader title={profileUser.fullName} subtitle={`${tweets.length} tweets`} showBack />
			<section className="profile">
				<div className="profile__banner" />
				<div className="profile__top">
					<UserAvatar fullName={profileUser.fullName} username={profileUser.username} avatarUrl={profileUser.avatarUrl} size={96} />
					<ProfileAction
						isOwnProfile={viewerId === profileUser.id}
						isFollowed={isFollowed}
						viewerId={viewerId}
						profileUserId={profileUser.id}
						onFollowed={reloadProfile}
					/>
				</div>
				<h2 className="profile__name">{profileUser.fullName}</h2>
				<p className="profile__username">@{profileUser.username}</p>
				<FollowCounts username={profileUser.username} counts={counts} />
			</section>
			<h3 className="profile__section-title">Tweets</h3>
			<UserTweetList tweets={tweets} />
		</div>
	)
}

export const UserTweetsPage = () => {
	const { username } = useParams()
	return <UserProfile key={username} username={username} />
}
