import { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAsyncData } from '../hooks/useAsyncData'
import { usePagination } from '../../ui/hooks/usePagination'
import { useAuth } from '../../auth/hooks/useAuth'
import { getUserByUsername } from '../services/userService'
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

// Without a logged user there is nobody to follow from, so the followed list is empty.
const loadViewerFollowingIds = (viewerId) => (viewerId ? getFollowingIdsByUserId(viewerId) : Promise.resolve([]))

const loadConnections = async (username, type, viewerId) => {
	const profileUser = await getUserByUsername(username)
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

// Followers or following list of a user: alphabetical by full name, 10 per page.
export const UserConnections = ({ username, type }) => {
	const { currentUser } = useAuth()
	const viewerId = currentUser?.id ?? null
	const loadUserConnections = useCallback(() => loadConnections(username, type, viewerId), [username, type, viewerId])
	const { result: connections, isLoading } = useAsyncData(loadUserConnections)
	const [newlyFollowedIds, setNewlyFollowedIds] = useState([])
	const { page, totalPages, pageItems, totalItems, goToPage } = usePagination(connections?.users)

	if (isLoading) return <Loader />
	if (!connections?.profileUser) return <StatusMessage type="error">No existe el usuario @{username}.</StatusMessage>

	const { profileUser, viewerFollowingIds } = connections
	const followedIds = new Set([...viewerFollowingIds, ...newlyFollowedIds])
	const handleFollowed = (userId) => setNewlyFollowedIds((previousIds) => [...previousIds, userId])

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
					/>
				))}
			</ul>
			<Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
		</div>
	)
}
