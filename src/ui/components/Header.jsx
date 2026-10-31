import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { logoutUser } from '../../auth/services/authService'
import './header.css'

// SVG paths (24x24) for the icon shown next to each navigation link.
const navigationIconPaths = {
	home: 'M12 3 2 11h3v10h6v-6h2v6h6V11h3L12 3Z',
	feed: 'M4 5h16v2H4V5Zm0 6h16v2H4v-2Zm0 6h10v2H4v-2Z',
	profile: 'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5Z',
	following:
		'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.9 0-7 2-7 4.5V20h14v-2.5C16 15 12.9 13 9 13Zm7.3-3.7 1.4 1.4 3.6-3.6 1.4 1.4-5 5-2.8-2.8 1.4-1.4Z',
	followers:
		'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM9 13c-3.9 0-7 2-7 4.5V20h14v-2.5C16 15 12.9 13 9 13Zm7.6.1c1.5.9 2.4 2.2 2.4 3.9V20h3v-2c0-2.4-2.4-4.3-5.4-4.9Z',
}

const buildNavigationLinks = (username) => [
	{ path: '/', label: 'Inicio', icon: 'home' },
	{ path: '/tweets/feed', label: 'Feed', icon: 'feed' },
	{ path: `/users/${username}`, label: 'Perfil', icon: 'profile' },
	{ path: `/users/${username}/following`, label: 'Seguidos', icon: 'following' },
	{ path: `/users/${username}/followers`, label: 'Seguidores', icon: 'followers' },
]

const NavigationIcon = ({ name }) => (
	<svg className="app-header__icon" viewBox="0 0 24 24" aria-hidden="true">
		<path d={navigationIconPaths[name]} />
	</svg>
)

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
						<NavigationIcon name={navigationLink.icon} />
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