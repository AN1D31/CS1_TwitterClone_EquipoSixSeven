import { Link } from 'react-router-dom'
import { formatTweetDate } from '../utils/formatTweetDate'
import { CommentButton } from './CommentButton'
import { LikeButton } from './LikeButton'
import { ShareButton } from './ShareButton'
import { TweetMedia } from './TweetMedia'

export const TweetCard = ({ tweet }) => {
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
			</footer>
		</article>
	)
}