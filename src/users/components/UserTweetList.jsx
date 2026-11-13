import { usePagination } from '../../ui/hooks/usePagination'
import { Pagination } from '../../ui/components/Pagination'
import { TweetCard } from '../../tweets/components/TweetCard'
import { StatusMessage } from './StatusMessage'

// Tweets of one user, newest first (the service already sorts them), 10 per page.
export const UserTweetList = ({ tweets }) => {
	const { page, totalPages, pageItems, goToPage } = usePagination(tweets)

	if (!tweets.length) return <StatusMessage>Este usuario todavía no ha publicado tweets.</StatusMessage>

	return (
		<section aria-label="Tweets del usuario">
			{pageItems.map((tweet) => (
				<TweetCard key={tweet.id} tweet={tweet} />
			))}
			<Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
		</section>
	)
}
