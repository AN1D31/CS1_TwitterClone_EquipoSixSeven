import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { ProtectedRoute } from '../auth/routes/ProtectedRoute'
import { PublicRoute } from '../auth/routes/PublicRoute'
import { TweetsRoutes } from '../tweets/routes/TweetsRoutes'
import { UsersRoutes } from '../users/routes/UsersRoutes'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { MainLayout } from '../ui/layouts/MainLayout'
import { DiscoverPage } from '../users/pages/DiscoverPage'

export const AppRouter = () => {
	return (
		<Routes>
			<Route
				path="/auth/*"
				element={
					<PublicRoute>
						<AuthRoutes />
					</PublicRoute>
				}
			/>
			<Route
				element={
					<ProtectedRoute>
						<MainLayout />
					</ProtectedRoute>
				}
			>
				<Route path="/" element={<HomePage />} />
				<Route path="/tweets/*" element={<TweetsRoutes />} />
				<Route path="/users/*" element={<UsersRoutes />} />
				<Route path="/discover" element={<DiscoverPage />} />
			</Route>
			<Route path="/*" element={<NotFoundPage />} />
		</Routes>
	)
}