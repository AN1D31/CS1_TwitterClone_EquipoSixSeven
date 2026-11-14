import { USE_MOCKS } from '../../firebase/dataSourceMode'
import { notifyDataChanged } from '../../ui/events/dataChangeEvents'
import { getUsersByIds, sortUsersByFullNameAsc } from '../../users/services/userService'
import * as likeServiceFirebase from './likeServiceFirebase'
import * as likeServiceMock from './likeServiceMock'

const likeDataSource = USE_MOCKS ? likeServiceMock : likeServiceFirebase

export const getLikeSummary = async (tweetId, viewerId) => {
	const likes = await likeDataSource.findLikesByTweetId(tweetId)
	return {
		likeCount: likes.length,
		isLikedByViewer: likes.some((like) => like.userId === viewerId),
	}
}

export const likeTweet = async (tweetId, userId) => {
	await likeDataSource.saveLike({
		tweetId,
		userId,
		createdAt: new Date().toISOString(),
	})
	notifyDataChanged('likes')
}

export const unlikeTweet = async (tweetId, userId) => {
	await likeDataSource.deleteLike(tweetId, userId)
	notifyDataChanged('likes')
}

export const getUsersWhoLikedTweet = async (tweetId) => {
	const likes = await likeDataSource.findLikesByTweetId(tweetId)
	const likedByUsers = await getUsersByIds(likes.map((like) => like.userId))
	return sortUsersByFullNameAsc(likedByUsers)
}