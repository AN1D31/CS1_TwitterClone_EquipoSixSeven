const currentReposts = []

export const findRepostsByTweetId = async (tweetId) => {
	return currentReposts.filter((repost) => repost.tweetId === tweetId)
}

export const findRepostsByUserIds = async (userIds) => {
	return currentReposts.filter((repost) => userIds.includes(repost.userId))
}

export const saveRepost = async (repost) => {
	const isAlreadySaved = currentReposts.some(
		(savedRepost) =>
			savedRepost.tweetId === repost.tweetId && savedRepost.userId === repost.userId,
	)
	if (!isAlreadySaved) {
		currentReposts.push(repost)
	}
	return repost
}

export const deleteRepost = async (tweetId, userId) => {
	const repostIndex = currentReposts.findIndex(
		(repost) => repost.tweetId === tweetId && repost.userId === userId,
	)
	if (repostIndex !== -1) {
		currentReposts.splice(repostIndex, 1)
	}
}