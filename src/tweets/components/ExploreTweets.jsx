import { useCallback, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { usePagination } from '../../ui/hooks/usePagination'
import { Pagination } from '../../ui/components/Pagination'
import { useAsyncData } from '../../users/hooks/useAsyncData'
import { FollowButton } from '../../users/components/FollowButton'
import { Loader, StatusMessage } from '../../users/components/StatusMessage'
import { getFollowingIdsByUserId } from '../../users/services/followService'
import { getExploreTweetsByUserId } from '../services/tweetService'
import { TweetCard } from './TweetCard'
import './exploreTweets.css'

const EMPTY_EXPLORE_MESSAGE = 'Todavía nadie más ha publicado tweets.'

const loadExploreData = async (userId) => {
	const [tweets, followingIds] = await Promise.all([
		getExploreTweetsByUserId(userId),
		getFollowingIdsByUserId(userId),
	])
	return { tweets, followingIds }
}

const ExploreTweetList = ({ tweets, initialFollowingIds, viewerId }) => {
	const { page, totalPages, pageItems, goToPage } = usePagination(tweets)
	const [followedIds, setFollowedIds] = useState(new Set(initialFollowingIds))

	const handleFollowed = (userId) => {
		setFollowedIds((previousIds) => new Set(previousIds).add(userId))
	}

	if (!tweets.length) return <StatusMessage>{EMPTY_EXPLORE_MESSAGE}</StatusMessage>

	return (
		<section aria-label="Tweets de otros usuarios">
			{pageItems.map((tweet) => (
				<div key={tweet.id} className="explore-item">
					<TweetCard tweet={tweet} />
					{!followedIds.has(tweet.authorId) && (
						<div className="explore-item__follow">
							<FollowButton
								followerId={viewerId}
								targetUserId={tweet.authorId}
								onFollowed={handleFollowed}
							/>
						</div>
					)}
				</div>
			))}
			<Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
		</section>
	)
}

export const ExploreTweets = () => {
	const { currentUser } = useAuth()
	const loadData = useCallback(() => loadExploreData(currentUser.id), [currentUser.id])
	const { result: exploreData, isLoading, error } = useAsyncData(loadData)

	if (isLoading) return <Loader />
	if (error)
		return <StatusMessage type="error">No se pudieron cargar los tweets: {error}</StatusMessage>

	return (
		<ExploreTweetList
			tweets={exploreData.tweets}
			initialFollowingIds={exploreData.followingIds}
			viewerId={currentUser.id}
		/>
	)
}