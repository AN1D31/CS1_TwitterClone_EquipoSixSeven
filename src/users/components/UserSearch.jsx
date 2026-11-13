import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAsyncData } from '../hooks/useAsyncData'
import { getAllUsers, sortUsersByFullNameAsc } from '../services/userService'
import { filterUsersBySearch } from '../utils/filterUsersBySearch'
import { UserAvatar } from './UserAvatar'
import './userSearch.css'

const MAX_RESULTS = 6

const SearchIcon = () => (
	<svg className="user-search__icon" viewBox="0 0 24 24" aria-hidden="true">
		<path d="M10.5 3a7.5 7.5 0 0 1 5.92 12.1l4.24 4.24-1.42 1.42-4.24-4.24A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
	</svg>
)

const SearchResults = ({ isLoading, error, matchingUsers }) => {
	if (isLoading) return <p className="user-search__message">Cargando usuarios...</p>
	if (error) return <p className="user-search__message user-search__message--error">No se pudo buscar: {error}</p>
	if (matchingUsers.length === 0) return <p className="user-search__message">No hay usuarios con ese nombre.</p>

	return (
		<ul className="user-search__results">
			{matchingUsers.map((user) => (
				<li key={user.id}>
					<Link to={`/users/${user.username}`} className="user-search__result">
						<UserAvatar fullName={user.fullName} username={user.username} avatarUrl={user.avatarUrl} />
						<span className="user-search__names">
							<strong>{user.fullName}</strong>
							<span>@{user.username}</span>
						</span>
					</Link>
				</li>
			))}
		</ul>
	)
}

// Search box: users are loaded once and filtered while typing. Enter opens the first result.
export const UserSearch = () => {
	const navigate = useNavigate()
	const [searchText, setSearchText] = useState('')
	const { result: allUsers, isLoading, error } = useAsyncData(getAllUsers)
	const matchingUsers = sortUsersByFullNameAsc(filterUsersBySearch(allUsers ?? [], searchText)).slice(0, MAX_RESULTS)
	const hasSearchText = searchText.trim() !== ''

	const handleSubmit = (event) => {
		event.preventDefault()
		const [firstUser] = matchingUsers
		if (firstUser) navigate(`/users/${firstUser.username}`)
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Escape') setSearchText('')
	}

	return (
		<form className="user-search" role="search" onSubmit={handleSubmit}>
			<label className="user-search__box">
				<SearchIcon />
				<input
					type="search"
					className="user-search__input"
					placeholder="Buscar usuarios por nombre o @usuario"
					aria-label="Buscar usuarios"
					value={searchText}
					onChange={(event) => setSearchText(event.target.value)}
					onKeyDown={handleKeyDown}
				/>
			</label>
			{hasSearchText && (
				<div className="user-search__panel">
					<SearchResults isLoading={isLoading} error={error} matchingUsers={matchingUsers} />
				</div>
			)}
		</form>
	)
}
