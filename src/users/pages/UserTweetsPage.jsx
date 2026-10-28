import { useParams } from 'react-router-dom'

export const UserTweetsPage = () => {
	const { username } = useParams()

	return <h1>Tweets de @{username}</h1>
}