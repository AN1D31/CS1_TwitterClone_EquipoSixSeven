import { Link } from 'react-router-dom'
import { UserAvatar } from './UserAvatar'
import { FollowButton } from './FollowButton'
import { UnfollowButton } from './UnfollowButton'

export const UserListItem = ({ user, currentUserId, isFollowed, onFollowed, onUnfollowed }) => {
	const canChangeFollow = Boolean(currentUserId) && user.id !== currentUserId

	return (
		<li className="user-item">
			<Link to={`/users/${user.username}`} className="user-item__profile">
				<UserAvatar fullName={user.fullName} username={user.username} avatarUrl={user.avatarUrl} />
				<div className="user-item__names">
					<strong>{user.fullName}</strong>
					<span>@{user.username}</span>
				</div>
			</Link>
			{canChangeFollow && !isFollowed && (
				<FollowButton followerId={currentUserId} targetUserId={user.id} onFollowed={onFollowed} />
			)}
			{canChangeFollow && isFollowed && (
				<UnfollowButton
					followerId={currentUserId}
					targetUserId={user.id}
					onUnfollowed={onUnfollowed}
				/>
			)}
		</li>
	)
}