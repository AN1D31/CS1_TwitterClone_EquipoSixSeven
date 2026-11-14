import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { formatTweetDate } from '../utils/formatTweetDate'
import { CommentButton } from './CommentButton'
import { DeleteTweetButton } from './DeleteTweetButton'
import { LikeButton } from './LikeButton'
import { ShareButton } from './ShareButton'
import { TweetMedia } from './TweetMedia'

// The delete button only appears on the logged user's own tweets.
// After deleting, the card hides itself and notifies the parent with onDeleted (optional).
export const TweetCard = ({ tweet, onDeleted }) => {
	const { currentUser } = useAuth()
	const [isDeleted, setIsDeleted] = useState(false)
	const isOwnTweet = Boolean(currentUser) && currentUser.id === tweet.authorId

	const handleDeleted = (tweetId) => {
		setIsDeleted(true)
		onDeleted?.(tweetId)
	}

	if (isDeleted) return null

	return (
		<article className="tweet-card">
			{tweet.repostedByUsername && (
				<p className="tweet-card__repost">
					↻ <Link to={`/users/${tweet.repostedByUsername}`}>{tweet.repostedByFullName}</Link>{' '}
					reposteó
				</p>
			)}
			<header className="tweet-card__header">
				<Link to={`/users/${tweet.authorUsername}`} className="tweet-card__author">
					{tweet.authorFullName}, @{tweet.authorUsername}
				</Link>
				{' - '}
				<Link to={`/tweets/${tweet.id}`} className="tweet-card__date-link">
					<time dateTime={tweet.createdAt} className="tweet-card__date">
						{formatTweetDate(tweet.createdAt)}
					</time>
				</Link>
			</header>
			<p className="tweet-card__body">{tweet.body}</p>
			<TweetMedia mediaUrl={tweet.mediaUrl} mediaType={tweet.mediaType} />
			<footer className="tweet-card__actions">
				<CommentButton tweetId={tweet.id} />
				<LikeButton tweetId={tweet.id} />
				<ShareButton tweetId={tweet.id} />
				{isOwnTweet && (
					<DeleteTweetButton
						tweetId={tweet.id}
						userId={currentUser.id}
						onDeleted={handleDeleted}
					/>
				)}
			</footer>
		</article>
	)
}