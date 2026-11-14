import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useAsyncData } from '../../users/hooks/useAsyncData'
import { BackHeader } from '../../users/components/BackHeader'
import { Loader, StatusMessage } from '../../users/components/StatusMessage'
import { getFollowingIdsByUserId } from '../../users/services/followService'
import { useDataVersion } from '../../ui/hooks/useDataVersion'
import { usePagination } from '../../ui/hooks/usePagination'
import { Pagination } from '../../ui/components/Pagination'
import { NewTweetsBanner } from '../components/NewTweetsBanner'
import { TweetCard } from '../components/TweetCard'
import { useNewTweetsCount } from '../hooks/useNewTweetsCount'
import { getFeedTweetsByUserId } from '../services/tweetService'
import '../../users/users.css'
import './feedPage.css'

const WATCHED_KINDS = ['tweets', 'reposts', 'follows']

const EMPTY_FEED_MESSAGE = 'Aún no hay tweets. Sigue a alguien o publica tu primer tweet.'

const FeedTweetList = ({ tweets }) => {
	const { page, totalPages, pageItems, goToPage } = usePagination(tweets)

	if (!tweets.length) return <StatusMessage>{EMPTY_FEED_MESSAGE}</StatusMessage>

	return (
		<section aria-label="Tweets del feed">
			{pageItems.map((tweet) => (
				<TweetCard key={tweet.id} tweet={tweet} />
			))}
			<Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
		</section>
	)
}

const FeedContent = ({ userId }) => {
	const dataVersion = useDataVersion(WATCHED_KINDS)
	const loadFeedTweets = useCallback(
		() => getFeedTweetsByUserId(userId, dataVersion),
		[userId, dataVersion],
	)
	const { result: tweets, isLoading, error } = useAsyncData(loadFeedTweets)

	if (isLoading) return <Loader />
	if (error) return <StatusMessage type="error">No se pudo cargar el feed: {error}</StatusMessage>
	return <FeedTweetList tweets={tweets} />
}

export const FeedPage = () => {
	const { currentUser } = useAuth()
	const [reloadCount, setReloadCount] = useState(0)
	const loadFollowingIds = useCallback(
		() => getFollowingIdsByUserId(currentUser.id),
		[currentUser.id],
	)
	const { result: followingIds } = useAsyncData(loadFollowingIds)
	const followedIds = useMemo(() => new Set(followingIds ?? []), [followingIds])
	const shouldCountTweet = useCallback((tweet) => followedIds.has(tweet.authorId), [followedIds])
	const { newTweetCount, markNewTweetsAsSeen } = useNewTweetsCount(shouldCountTweet)

	const handleShowNewTweets = () => {
		markNewTweetsAsSeen()
		setReloadCount((previousCount) => previousCount + 1)
	}

	return (
		<div className="users-feature">
			<BackHeader title="Feed" subtitle="Tus tweets y los de quienes sigues" />
			<div className="feed-page__compose">
				<p className="feed-page__compose-text">¿Qué está pasando?</p>
				<Link to="/tweets/compose" className="feed-page__compose-link">
					Publicar tweet
				</Link>
			</div>
			<NewTweetsBanner count={newTweetCount} onShow={handleShowNewTweets} />
			<FeedContent key={reloadCount} userId={currentUser.id} />
		</div>
	)
}
