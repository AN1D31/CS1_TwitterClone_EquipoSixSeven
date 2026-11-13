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