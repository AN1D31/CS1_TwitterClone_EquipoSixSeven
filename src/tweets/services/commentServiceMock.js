const currentComments = []

export const findCommentsByTweetId = async (tweetId) => {
	return currentComments.filter((comment) => comment.tweetId === tweetId)
}

export const saveComment = async (comment) => {
	const savedComment = { ...comment, id: `comment-${Date.now()}-${currentComments.length}` }
	currentComments.push(savedComment)
	return savedComment
}