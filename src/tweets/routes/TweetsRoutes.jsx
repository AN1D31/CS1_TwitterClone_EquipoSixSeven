import { Navigate, Route, Routes } from 'react-router-dom'
import { ComposeTweetPage } from '../pages/ComposeTweetPage'

// The feed is shown on the home page, so any other tweets URL goes back home.
export const TweetsRoutes = () => {
	return (
		<Routes>
			<Route path="compose" element={<ComposeTweetPage />} />
			<Route path="/*" element={<Navigate to="/" replace />} />
		</Routes>
	)
}