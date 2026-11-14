import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useAsyncData } from '../../users/hooks/useAsyncData'
import { usePagination } from '../../ui/hooks/usePagination'
import { Pagination } from '../../ui/components/Pagination'
import { BackHeader } from '../../users/components/BackHeader'
import { Loader, StatusMessage } from '../../users/components/StatusMessage'
import { UserListItem } from '../../users/components/UserListItem'
import { getFollowingIdsByUserId } from '../../users/services/followService'
import { getUsersWhoLikedTweet } from '../services/likeService'
import '../../users/users.css'

const EMPTY_LIKES_MESSAGE = 'A nadie le ha gustado este tweet todavía.'

const loadViewerFollowingIds = (viewerId) => {
	return viewerId ? getFollowingIdsByUserId(viewerId) : Promise.resolve([])
}

const loadLikes = async (tweetId, viewerId) => {
	const [users, viewerFollowingIds] = await Promise.all([
		getUsersWhoLikedTweet(tweetId),
		loadViewerFollowingIds(viewerId),
	])
	return { users, viewerFollowingIds }
}

const LikedByList = ({ users, viewerId, viewerFollowingIds }) => {
	const { page, totalPages, pageItems, goToPage } = usePagination(users)
	const followedIds = new Set(viewerFollowingIds)

	if (!users.length) return <StatusMessage>{EMPTY_LIKES_MESSAGE}</StatusMessage>

	return (
		<>
			<ul className="user-list">
				{pageItems.map((user) => (
					<UserListItem
						key={user.id}
						user={user}
						currentUserId={viewerId}
						isFollowed={followedIds.has(user.id)}
					/>
				))}
			</ul>
			<Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
		</>
	)
}

// Users who liked a tweet: alphabetical by full name, 10 per page.
export const TweetLikesPage = () => {
	const { tweetId } = useParams()
	const { currentUser } = useAuth()
	const viewerId = currentUser?.id ?? null
	const loadTweetLikes = useCallback(() => loadLikes(tweetId, viewerId), [tweetId, viewerId])
	const { result: likes, isLoading, error } = useAsyncData(loadTweetLikes)

	return (
		<div className="users-feature">
			<BackHeader
				title="Me gusta"
				subtitle="Usuarios a quienes les gustó este tweet"
				showBack
			/>
			{isLoading && <Loader />}
			{error && (
				<StatusMessage type="error">No se pudo cargar la lista: {error}</StatusMessage>
			)}
			{likes && (
				<LikedByList
					users={likes.users}
					viewerId={viewerId}
					viewerFollowingIds={likes.viewerFollowingIds}
				/>
			)}
		</div>
	)
}