import { Navigate, Route, Routes } from 'react-router-dom'
import { FeedPage } from '../pages/FeedPage'
import { ComposeTweetPage } from '../pages/ComposeTweetPage'
import { TweetLikesPage } from '../pages/TweetLikesPage'
import { TweetPage } from '../pages/TweetPage'

export const TweetsRoutes = () => {
	return (
		<Routes>
			<Route path="feed" element={<FeedPage />} />
			<Route path="compose" element={<ComposeTweetPage />} />
			<Route path=":tweetId" element={<TweetPage />} />
			<Route path=":tweetId/likes" element={<TweetLikesPage />} />
			<Route path="/*" element={<Navigate to="/tweets/feed" />} />
		</Routes>
	)
}