const currentLikes = []

export const findLikesByTweetId = async (tweetId) => {
	return currentLikes.filter((like) => like.tweetId === tweetId)
}

export const saveLike = async (like) => {
	const isAlreadySaved = currentLikes.some(
		(savedLike) => savedLike.tweetId === like.tweetId && savedLike.userId === like.userId,
	)
	if (!isAlreadySaved) {
		currentLikes.push(like)
	}
	return like
}

export const deleteLike = async (tweetId, userId) => {
	const likeIndex = currentLikes.findIndex(
		(like) => like.tweetId === tweetId && like.userId === userId,
	)
	if (likeIndex !== -1) {
		currentLikes.splice(likeIndex, 1)
	}
}