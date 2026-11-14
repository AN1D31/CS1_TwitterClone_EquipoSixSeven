import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useAsyncData } from '../../users/hooks/useAsyncData'
import { BackHeader } from '../../users/components/BackHeader'
import { Loader, StatusMessage } from '../../users/components/StatusMessage'
import { CommentSection } from '../components/CommentSection'
import { TweetCard } from '../components/TweetCard'
import { getTweetById } from '../services/tweetService'
import '../../users/users.css'

export const TweetPage = () => {
	const { tweetId } = useParams()
	const loadTweet = useCallback(() => getTweetById(tweetId), [tweetId])
	const { result: tweet, isLoading, error } = useAsyncData(loadTweet)

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
					<TweetCard tweet={tweet} />
					<CommentSection tweetId={tweet.id} />
				</>
			)}
		</div>
	)
}