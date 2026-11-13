import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import './mainLayout.css'

export const MainLayout = () => {
	return (
		<div className="app-shell">
			<Header />
			<main className="app-shell__content">
				<Outlet />
			</main>
		</div>
	)
}