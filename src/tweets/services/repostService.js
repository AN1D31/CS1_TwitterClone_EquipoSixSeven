import { USE_MOCKS } from '../../firebase/dataSourceMode'
import { notifyDataChanged } from '../../ui/events/dataChangeEvents'
import * as repostServiceFirebase from './repostServiceFirebase'
import * as repostServiceMock from './repostServiceMock'

const repostDataSource = USE_MOCKS ? repostServiceMock : repostServiceFirebase

export const getRepostSummary = async (tweetId, viewerId) => {
	const reposts = await repostDataSource.findRepostsByTweetId(tweetId)
	return {
		repostCount: reposts.length,
		isRepostedByViewer: reposts.some((repost) => repost.userId === viewerId),
	}
}

export const getRepostsByUserIds = async (userIds) => {
	if (userIds.length === 0) {
		return []
	}
	return repostDataSource.findRepostsByUserIds(userIds)
}

export const repostTweet = async (tweetId, userId) => {
	await repostDataSource.saveRepost({
		tweetId,
		userId,
		createdAt: new Date().toISOString(),
	})
	notifyDataChanged('reposts')
}

export const undoRepost = async (tweetId, userId) => {
	await repostDataSource.deleteRepost(tweetId, userId)
	notifyDataChanged('reposts')
}