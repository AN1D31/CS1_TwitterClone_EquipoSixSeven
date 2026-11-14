import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { startRealtimeSync } from '../../firebase/realtimeSync'
import { Header } from '../components/Header'
import './mainLayout.css'

export const MainLayout = () => {
	useEffect(() => startRealtimeSync(), [])

	return (
		<div className="app-shell">
			<Header />
			<main className="app-shell__content">
				<Outlet />
			</main>
		</div>
	)
}
