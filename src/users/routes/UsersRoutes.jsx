import { Navigate, Route, Routes } from 'react-router-dom'
import { UserTweetsPage } from '../pages/UserTweetsPage'
import { FollowersPage } from '../pages/FollowersPage'
import { FollowingPage } from '../pages/FollowingPage'

export const UsersRoutes = () => {
	return (
		<Routes>
			<Route path=":username" element={<UserTweetsPage />} />
			<Route path=":username/followers" element={<FollowersPage />} />
			<Route path=":username/following" element={<FollowingPage />} />
			<Route path="/*" element={<Navigate to="/" />} />
		</Routes>
	)
}