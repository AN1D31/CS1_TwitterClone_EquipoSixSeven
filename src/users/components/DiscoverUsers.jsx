import { useCallback, useState } from 'react'
import { useAsyncData } from '../hooks/useAsyncData'
import { usePagination } from '../../ui/hooks/usePagination'
import { useAuth } from '../../auth/hooks/useAuth'
import { getUsersToDiscoverByUserId } from '../services/followService'
import { filterUsersBySearch } from '../utils/filterUsersBySearch'
import { applyFollowChanges } from '../utils/applyFollowChanges'
import { BackHeader } from './BackHeader'
import { Pagination } from '../../ui/components/Pagination'
import { Loader, StatusMessage } from './StatusMessage'
import { UserListItem } from './UserListItem'
import '../users.css'
import './discoverUsers.css'

const filterDiscoverUsers = (users, searchText) =>
	searchText.trim() === '' ? users : filterUsersBySearch(users, searchText)

export const DiscoverUsers = () => {
	const { currentUser } = useAuth()
	const viewerId = currentUser.id
	const loadUsersToDiscover = useCallback(() => getUsersToDiscoverByUserId(viewerId), [viewerId])
	const { result: users, isLoading, error } = useAsyncData(loadUsersToDiscover)
	const [searchText, setSearchText] = useState('')
	const [followChanges, setFollowChanges] = useState({})
	const visibleUsers = filterDiscoverUsers(users ?? [], searchText)
	const { page, totalPages, pageItems, totalItems, goToPage } = usePagination(visibleUsers)

	if (isLoading) return <Loader />
	if (error) return <StatusMessage type="error">No se pudo cargar la lista: {error}</StatusMessage>

	const followedIds = applyFollowChanges([], followChanges)
	const hasSearchText = searchText.trim() !== ''
	const emptyMessage = hasSearchText
		? 'No hay usuarios con ese nombre.'
		: 'Ya sigues a todos los usuarios registrados.'

	const handleSearchChange = (event) => {
		setSearchText(event.target.value)
		goToPage(1)
	}
	const handleFollowed = (userId) => setFollowChanges((previous) => ({ ...previous, [userId]: true }))
	const handleUnfollowed = (userId) => setFollowChanges((previous) => ({ ...previous, [userId]: false }))

	return (
		<div className="users-feature">
			<BackHeader title="Descubrir" subtitle="Personas que aún no sigues" />
			<div className="discover-search">
				<input
					type="search"
					className="discover-search__input"
					placeholder="Buscar por nombre o @usuario"
					aria-label="Buscar personas"
					value={searchText}
					onChange={handleSearchChange}
				/>
			</div>
			{totalItems === 0 && <StatusMessage>{emptyMessage}</StatusMessage>}
			<ul className="user-list">
				{pageItems.map((user) => (
					<UserListItem
						key={user.id}
						user={user}
						currentUserId={viewerId}
						isFollowed={followedIds.has(user.id)}
						onFollowed={handleFollowed}
						onUnfollowed={handleUnfollowed}
					/>
				))}
			</ul>
			<Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
		</div>
	)
}