import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDataVersion } from '../../ui/hooks/useDataVersion'
import { useAsyncData } from '../../users/hooks/useAsyncData'
import { BackHeader } from '../../users/components/BackHeader'
import { Loader, StatusMessage } from '../../users/components/StatusMessage'
import { CommentSection } from '../components/CommentSection'
import { TweetCard } from '../components/TweetCard'
import { getTweetById } from '../services/tweetService'
import '../../users/users.css'

const WATCHED_KINDS = ['tweets']

export const TweetPage = () => {
	const { tweetId } = useParams()
	const navigate = useNavigate()
	const dataVersion = useDataVersion(WATCHED_KINDS)
	const loadTweet = useCallback(
		() => getTweetById(tweetId, dataVersion),
		[tweetId, dataVersion],
	)
	const { result: tweet, isLoading, error } = useAsyncData(loadTweet)
	const handleTweetDeleted = () => navigate('/tweets/feed')

	return (
		<div className="users-feature">
			<BackHeader title="Tweet" showBack />
			{isLoading && <Loader />}
			{error && (
				<StatusMessage type="error">No se pudo cargar el tweet: {error}</StatusMessage>
			)}
			{!isLoading && !error && !tweet && (
				<StatusMessage type="error">Este tweet no existe.</StatusMessage>
			)}
			{tweet && (
				<>
					<TweetCard tweet={tweet} onDeleted={handleTweetDeleted} />
					<CommentSection tweetId={tweet.id} />
				</>
			)}
		</div>
	)
}
