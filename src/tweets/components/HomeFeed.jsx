    import { useCallback } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useAsyncData } from '../../users/hooks/useAsyncData'
import { Loader, StatusMessage } from '../../users/components/StatusMessage'
import { usePagination } from '../../ui/hooks/usePagination'
import { Pagination } from '../../ui/components/Pagination'
import { TweetCard } from './TweetCard'
import { getFeedTweetsByUserId } from '../services/tweetService'
import '../../users/users.css'

const EMPTY_FEED_MESSAGE = 'Aún no hay tweets. Sigue a alguien o publica tu primer tweet.'

// Feed tweets, newest first (the service already sorts them), 10 per page.
const FeedTweetList = ({ tweets }) => {
	const { page, totalPages, pageItems, goToPage } = usePagination(tweets)

	if (!tweets.length) return <StatusMessage>{EMPTY_FEED_MESSAGE}</StatusMessage>

	return (
		<>
			{pageItems.map((tweet) => (
				<TweetCard key={tweet.id} tweet={tweet} />
			))}
			<Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
		</>
	)
}

const FeedContent = ({ tweets, isLoading, error }) => {
	if (isLoading) return <Loader />
	if (error)
		return <StatusMessage type="error">No se pudieron cargar los tweets: {error}</StatusMessage>
	return <FeedTweetList tweets={tweets} />
}

// Tweets of the logged user and of the users they follow, shown on the home page.
// reloadKey changes after following someone, so the tweets load again.
export const HomeFeed = ({ reloadKey }) => {
	const { currentUser } = useAuth()
	const loadFeedTweets = useCallback(
		() => getFeedTweetsByUserId(currentUser.id, reloadKey),
		[currentUser.id, reloadKey],
	)
	const { result: tweets, isLoading, error } = useAsyncData(loadFeedTweets)

	return (
		<section className="users-feature home-feed" aria-labelledby="home-feed-title">
			<h2 id="home-feed-title" className="home-feed__title">
				Tweets recientes
			</h2>
			<FeedContent tweets={tweets} isLoading={isLoading} error={error} />
		</section>
	)
}