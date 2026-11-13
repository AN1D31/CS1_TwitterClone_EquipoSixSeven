import { Navigate, Route, Routes } from 'react-router-dom'
import { FeedPage } from '../pages/FeedPage'
import { ComposeTweetPage } from '../pages/ComposeTweetPage'

export const TweetsRoutes = () => {
	return (
		<Routes>
			<Route path="feed" element={<FeedPage />} />
			<Route path="compose" element={<ComposeTweetPage />} />
			<Route path="/*" element={<Navigate to="/tweets/feed" />} />
		</Routes>
	)
}