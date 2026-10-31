import { useParams } from 'react-router-dom'
import { UserConnections } from '../components/UserConnections'

export const FollowersPage = () => {
	const { username } = useParams()
	return <UserConnections key={`followers-${username}`} username={username} type="followers" />
}
