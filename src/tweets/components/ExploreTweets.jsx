import { useCallback, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useDataVersion } from '../../ui/hooks/useDataVersion'
import { usePagination } from '../../ui/hooks/usePagination'
import { Pagination } from '../../ui/components/Pagination'
import { useAsyncData } from '../../users/hooks/useAsyncData'
import { FollowButton } from '../../users/components/FollowButton'
import { Loader, StatusMessage } from '../../users/components/StatusMessage'
import { getFollowingIdsByUserId } from '../../users/services/followService'
import { useNewTweetsCount } from '../hooks/useNewTweetsCount'
import { getExploreTweetsByUserId } from '../services/tweetService'
import { NewTweetsBanner } from './NewTweetsBanner'
import { TweetCard } from './TweetCard'
import './exploreTweets.css'

const WATCHED_KINDS = ['tweets', 'follows']

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
	const [followedByClick, setFollowedByClick] = useState([])
	const followedIds = new Set([...initialFollowingIds, ...followedByClick])

	const handleFollowed = (userId) => {
		setFollowedByClick((previousIds) => [...previousIds, userId])
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

const ExploreContent = ({ viewerId }) => {
	const dataVersion = useDataVersion(WATCHED_KINDS)
	const loadData = useCallback(
		() => loadExploreData(viewerId, dataVersion),
		[viewerId, dataVersion],
	)
	const { result: exploreData, isLoading, error } = useAsyncData(loadData)

	if (isLoading) return <Loader />
	if (error)
		return <StatusMessage type="error">No se pudieron cargar los tweets: {error}</StatusMessage>

	return (
		<ExploreTweetList
			tweets={exploreData.tweets}
			initialFollowingIds={exploreData.followingIds}
			viewerId={viewerId}
		/>
	)
}

export const ExploreTweets = () => {
	const { currentUser } = useAuth()
	const [reloadCount, setReloadCount] = useState(0)
	const shouldCountTweet = useCallback((tweet) => tweet.authorId !== currentUser.id, [currentUser.id])
	const { newTweetCount, markNewTweetsAsSeen } = useNewTweetsCount(shouldCountTweet)

	const handleShowNewTweets = () => {
		markNewTweetsAsSeen()
		setReloadCount((previousCount) => previousCount + 1)
	}

	return (
		<>
			<NewTweetsBanner count={newTweetCount} onShow={handleShowNewTweets} />
			<ExploreContent key={reloadCount} viewerId={currentUser.id} />
		</>
	)
}
