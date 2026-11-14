import { Link } from 'react-router-dom'
import { UserAvatar } from '../../users/components/UserAvatar'
import { formatTweetDate } from '../utils/formatTweetDate'

export const CommentItem = ({ comment }) => {
	const { author } = comment
	const fullName = author?.fullName ?? 'Usuario desconocido'
	const username = author?.username ?? ''

	return (
		<li className="comment-item">
			<UserAvatar
				fullName={fullName}
				username={username}
				avatarUrl={author?.avatarUrl}
				size={40}
			/>
			<div className="comment-item__content">
				<p className="comment-item__header">
					{username ? (
						<Link to={`/users/${username}`} className="comment-item__author">
							{fullName}, @{username}
						</Link>
					) : (
						<span className="comment-item__author">{fullName}</span>
					)}
					{' - '}
					<time dateTime={comment.createdAt} className="comment-item__date">
						{formatTweetDate(comment.createdAt)}
					</time>
				</p>
				<p className="comment-item__body">{comment.body}</p>
			</div>
		</li>
	)
}