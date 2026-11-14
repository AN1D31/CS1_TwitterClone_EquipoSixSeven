import { usePagination } from '../../ui/hooks/usePagination'
import { Pagination } from '../../ui/components/Pagination'
import { TweetCard } from '../../tweets/components/TweetCard'
import { StatusMessage } from './StatusMessage'

export const UserTweetList = ({ tweets, emptyMessage }) => {
	const { page, totalPages, pageItems, goToPage } = usePagination(tweets)

	if (!tweets.length) return <StatusMessage>{emptyMessage}</StatusMessage>

	return (
		<section aria-label="Tweets del usuario">
			{pageItems.map((tweet) => (
				<TweetCard key={tweet.id} tweet={tweet} />
			))}
			<Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
		</section>
	)
}
