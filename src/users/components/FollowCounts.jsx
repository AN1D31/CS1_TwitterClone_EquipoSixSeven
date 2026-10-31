import { Link } from 'react-router-dom'

// Followers and following counters with links to each list.
export const FollowCounts = ({ username, counts }) => {
	if (!counts) return null

	return (
		<div className="follow-counts">
			<Link to={`/users/${username}/following`} className="follow-counts__item">
				<strong>{counts.following}</strong> Seguidos
			</Link>
			<Link to={`/users/${username}/followers`} className="follow-counts__item">
				<strong>{counts.followers}</strong> Seguidores
			</Link>
		</div>
	)
}
