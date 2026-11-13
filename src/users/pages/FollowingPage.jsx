import { useParams } from 'react-router-dom'
import { UserConnections } from '../components/UserConnections'

export const FollowingPage = () => {
	const { username } = useParams()
	return <UserConnections key={`following-${username}`} username={username} type="following" />
}
