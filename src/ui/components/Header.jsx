import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { logoutUser } from '../../auth/services/authService'
import './header.css'

const buildNavigationLinks = (username) => [
	{ path: '/', label: 'Inicio' },
	{ path: '/tweets/feed', label: 'Feed' },
	{ path: `/users/${username}`, label: 'Perfil' },
	{ path: `/users/${username}/following`, label: 'Seguidos' },
	{ path: `/users/${username}/followers`, label: 'Seguidores' },
]

const getNavigationLinkClassName = ({ isActive }) => {
	return isActive ? 'app-header__link app-header__link--active' : 'app-header__link'
}

export const Header = () => {
	const navigate = useNavigate()
	const { currentUser, logout } = useAuth()
	const navigationLinks = buildNavigationLinks(currentUser.username)

	const handleLogout = async () => {
		try {
			await logoutUser()
		} finally {
			logout()
			navigate('/auth/login')
		}
	}

	return (
		<header className="app-header">
			<Link to="/" className="app-header__logo" aria-label="Ir al inicio">
				67
			</Link>
			<nav className="app-header__nav" aria-label="Navegación principal">
				{navigationLinks.map((navigationLink) => (
					<NavLink
						key={navigationLink.path}
						to={navigationLink.path}
						className={getNavigationLinkClassName}
						end
					>
						{navigationLink.label}
					</NavLink>
				))}
			</nav>
			<Link to="/tweets/compose" className="app-header__tweet-button">
				Tweet
			</Link>
			<div className="app-header__session">
				<span className="app-header__username">@{currentUser.username}</span>
				<button type="button" className="app-header__logout" onClick={handleLogout}>
					Cerrar sesión
				</button>
			</div>
		</header>
	)
}