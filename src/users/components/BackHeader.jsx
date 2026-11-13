import { useNavigate } from 'react-router-dom'

// Sticky title bar at the top of each page, like X.
export const BackHeader = ({ title, subtitle = null, showBack = false }) => {
	const navigate = useNavigate()

	return (
		<div className="back-header">
			{showBack && (
				<button type="button" className="back-header__back" onClick={() => navigate(-1)} aria-label="Volver">
					←
				</button>
			)}
			<div>
				<h1 className="back-header__title">{title}</h1>
				{subtitle && <p className="back-header__subtitle">{subtitle}</p>}
			</div>
		</div>
	)
}
