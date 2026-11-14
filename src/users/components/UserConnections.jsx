import { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAsyncData } from '../hooks/useAsyncData'
import { usePagination } from '../../ui/hooks/usePagination'
import { useAuth } from '../../auth/hooks/useAuth'
import { getUserByUsername } from '../services/userService'
import { normalizeUsername } from '../utils/normalizeUsername'
import { applyFollowChanges } from '../utils/applyFollowChanges'
import { getFollowersByUserId, getFollowingByUserId, getFollowingIdsByUserId } from '../services/followService'
import { BackHeader } from './BackHeader'
import { Pagination } from '../../ui/components/Pagination'
import { Loader, StatusMessage } from './StatusMessage'
import { UserListItem } from './UserListItem'
import '../users.css'

const listLoaders = { followers: getFollowersByUserId, following: getFollowingByUserId }

const emptyMessages = {
	followers: 'Este usuario todavía no tiene seguidores.',
	following: 'Este usuario todavía no sigue a nadie.',
}

const loadViewerFollowingIds = (viewerId) => (viewerId ? getFollowingIdsByUserId(viewerId) : Promise.resolve([]))

const loadConnections = async (username, type, viewerId) => {
	const profileUser = await getUserByUsername(normalizeUsername(username))
	if (!profileUser) return { profileUser: null }

	const [users, viewerFollowingIds] = await Promise.all([listLoaders[type](profileUser.id), loadViewerFollowingIds(viewerId)])
	return { profileUser, users, viewerFollowingIds }
}

const tabClass = ({ isActive }) => (isActive ? 'user-tabs__item user-tabs__item--active' : 'user-tabs__item')

const ConnectionTabs = ({ username }) => (
	<nav className="user-tabs">
		<NavLink to={`/users/${username}/followers`} className={tabClass}>
			Seguidores
		</NavLink>
		<NavLink to={`/users/${username}/following`} className={tabClass}>
			Seguidos
		</NavLink>
	</nav>
)

export const UserConnections = ({ username, type }) => {
	const { currentUser } = useAuth()
	const viewerId = currentUser?.id ?? null
	const loadUserConnections = useCallback(() => loadConnections(username, type, viewerId), [username, type, viewerId])
	const { result: connections, isLoading, error } = useAsyncData(loadUserConnections)
	const [followChanges, setFollowChanges] = useState({})
	const { page, totalPages, pageItems, totalItems, goToPage } = usePagination(connections?.users)

	if (isLoading) return <Loader />
	if (error) return <StatusMessage type="error">No se pudo cargar la lista: {error}</StatusMessage>
	if (!connections?.profileUser) return <StatusMessage type="error">No existe el usuario @{username}.</StatusMessage>

	const { profileUser, viewerFollowingIds } = connections
	const followedIds = applyFollowChanges(viewerFollowingIds, followChanges)
	const handleFollowed = (userId) => setFollowChanges((previous) => ({ ...previous, [userId]: true }))
	const handleUnfollowed = (userId) => setFollowChanges((previous) => ({ ...previous, [userId]: false }))

	return (
		<div className="users-feature">
			<BackHeader title={profileUser.fullName} subtitle={`@${profileUser.username} · ${totalItems} usuarios`} showBack />
			<ConnectionTabs username={profileUser.username} />
			{totalItems === 0 && <StatusMessage>{emptyMessages[type]}</StatusMessage>}
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