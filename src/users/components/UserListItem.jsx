import { Link } from 'react-router-dom'
import { UserAvatar } from './UserAvatar'
import { FollowButton } from './FollowButton'

export const UserListItem = ({ user, currentUserId, isFollowed, onFollowed }) => {
	const canFollow = Boolean(currentUserId) && user.id !== currentUserId && !isFollowed

	return (
		<li className="user-item">
			<Link to={`/users/${user.username}`} className="user-item__profile">
				<UserAvatar fullName={user.fullName} username={user.username} avatarUrl={user.avatarUrl} />
				<div className="user-item__names">
					<strong>{user.fullName}</strong>
					<span>@{user.username}</span>
				</div>
			</Link>
			{canFollow && <FollowButton followerId={currentUserId} targetUserId={user.id} onFollowed={onFollowed} />}
			{isFollowed && <span className="user-badge">Siguiendo</span>}
		</li>
	)
}
