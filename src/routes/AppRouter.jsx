import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { TweetsRoutes } from '../tweets/routes/TweetsRoutes'
import { UsersRoutes } from '../users/routes/UsersRoutes'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { MainLayout } from '../ui/layouts/MainLayout'

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/auth/*" element={<AuthRoutes />} />
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/tweets/*" element={<TweetsRoutes />} />
				<Route path="/users/*" element={<UsersRoutes />} />
			</Route>
			<Route path="/*" element={<NotFoundPage />} />
		</Routes>
	)
}