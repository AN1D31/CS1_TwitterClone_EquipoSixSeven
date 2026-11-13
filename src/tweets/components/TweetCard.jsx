import { Link } from 'react-router-dom'
import { formatTweetDate } from '../utils/formatTweetDate'

export const TweetCard = ({ tweet }) => {
	return (
		<article className="tweet-card">
			<header className="tweet-card__header">
				<Link to={`/users/${tweet.authorUsername}`} className="tweet-card__author">
					{tweet.authorFullName}, @{tweet.authorUsername}
				</Link>
				{' - '}
				<time dateTime={tweet.createdAt} className="tweet-card__date">
					{formatTweetDate(tweet.createdAt)}
				</time>
			</header>
			<p className="tweet-card__body">{tweet.body}</p>
		</article>
	)
}