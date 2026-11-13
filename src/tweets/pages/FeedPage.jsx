import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useAsyncData } from '../../users/hooks/useAsyncData'
import { BackHeader } from '../../users/components/BackHeader'
import { Loader, StatusMessage } from '../../users/components/StatusMessage'
import { usePagination } from '../../ui/hooks/usePagination'
import { Pagination } from '../../ui/components/Pagination'
import { TweetCard } from '../components/TweetCard'
import { getFeedTweetsByUserId } from '../services/tweetService'
import '../../users/users.css'
import './feedPage.css'

const EMPTY_FEED_MESSAGE = 'Aún no hay tweets. Sigue a alguien o publica tu primer tweet.'

// Feed tweets, newest first (the service already sorts them), 10 per page.
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

const FeedContent = ({ tweets, isLoading, error }) => {
	if (isLoading) return <Loader />
	if (error) return <StatusMessage type="error">No se pudo cargar el feed: {error}</StatusMessage>
	return <FeedTweetList tweets={tweets} />
}

// Tweets of the logged user and of the users they follow.
export const FeedPage = () => {
	const { currentUser } = useAuth()
	const loadFeedTweets = useCallback(
		() => getFeedTweetsByUserId(currentUser.id),
		[currentUser.id],
	)
	const { result: tweets, isLoading, error } = useAsyncData(loadFeedTweets)

	return (
		<div className="users-feature">
			<BackHeader title="Feed" subtitle="Tus tweets y los de quienes sigues" />
			<div className="feed-page__compose">
				<p className="feed-page__compose-text">¿Qué está pasando?</p>
				<Link to="/tweets/compose" className="feed-page__compose-link">
					Publicar tweet
				</Link>
			</div>
			<FeedContent tweets={tweets} isLoading={isLoading} error={error} />
		</div>
	)
}
