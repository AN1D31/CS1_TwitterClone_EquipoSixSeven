import { mockFollows } from '../data/mockFollows'

const currentFollows = [...mockFollows]

export const findFollowsByFollowerId = async (followerId) => {
	return currentFollows.filter((follow) => follow.followerId === followerId)
}

export const findFollowsByFollowingId = async (followingId) => {
	return currentFollows.filter((follow) => follow.followingId === followingId)
}

export const saveFollow = async (follow) => {
	currentFollows.push(follow)
	return follow
}

export const deleteFollow = async (followerId, followingId) => {
	const followIndex = currentFollows.findIndex(
		(follow) => follow.followerId === followerId && follow.followingId === followingId,
	)
	if (followIndex !== -1) {
		currentFollows.splice(followIndex, 1)
	}
}