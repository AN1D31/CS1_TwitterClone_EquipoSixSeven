import { USE_MOCKS } from '../../firebase/dataSourceMode'
import * as followServiceFirebase from './followServiceFirebase'
import * as followServiceMock from './followServiceMock'
import { getUsersByIds, sortUsersByFullNameAsc } from './userService'

const followDataSource = USE_MOCKS ? followServiceMock : followServiceFirebase

export const getFollowingIdsByUserId = async (userId) => {
	const followsByUser = await followDataSource.findFollowsByFollowerId(userId)
	return followsByUser.map((follow) => follow.followingId)
}

export const getFollowersIdsByUserId = async (userId) => {
	const followsOfUser = await followDataSource.findFollowsByFollowingId(userId)
	return followsOfUser.map((follow) => follow.followerId)
}

export const getFollowingByUserId = async (userId) => {
	const followingIds = await getFollowingIdsByUserId(userId)
	const followingUsers = await getUsersByIds(followingIds)
	return sortUsersByFullNameAsc(followingUsers)
}

export const getFollowersByUserId = async (userId) => {
	const followersIds = await getFollowersIdsByUserId(userId)
	const followerUsers = await getUsersByIds(followersIds)
	return sortUsersByFullNameAsc(followerUsers)
}

export const countFollowingByUserId = async (userId) => {
	const followingIds = await getFollowingIdsByUserId(userId)
	return followingIds.length
}

export const countFollowersByUserId = async (userId) => {
	const followersIds = await getFollowersIdsByUserId(userId)
	return followersIds.length
}

export const isUserFollowing = async (followerId, followingId) => {
	const followingIds = await getFollowingIdsByUserId(followerId)
	return followingIds.includes(followingId)
}

export const followUser = async (followerId, followingId) => {
	if (followerId === followingId) {
		throw new Error('follow/cannot-follow-yourself')
	}
	const alreadyFollowing = await isUserFollowing(followerId, followingId)
	if (alreadyFollowing) {
		throw new Error('follow/already-following')
	}
	await followDataSource.saveFollow({
		followerId,
		followingId,
		createdAt: new Date().toISOString(),
	})
}

export const getFollowCountsByUserId = async (userId) => {
	const [followers, following] = await Promise.all([
		countFollowersByUserId(userId),
		countFollowingByUserId(userId),
	])
	return { followers, following }
}