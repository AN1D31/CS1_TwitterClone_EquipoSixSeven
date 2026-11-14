import { USE_MOCKS } from '../../firebase/dataSourceMode'
import { getUsersByIds } from '../../users/services/userService'
import * as commentServiceFirebase from './commentServiceFirebase'
import * as commentServiceMock from './commentServiceMock'

export const MAX_COMMENT_LENGTH = 280

const commentDataSource = USE_MOCKS ? commentServiceMock : commentServiceFirebase

const sortCommentsByCreatedAtDesc = (comments) => {
	return [...comments].sort(
		(firstComment, secondComment) =>
			new Date(secondComment.createdAt) - new Date(firstComment.createdAt),
	)
}

const addAuthorToComments = async (comments) => {
	const authorIds = [...new Set(comments.map((comment) => comment.authorId))]
	const authors = await getUsersByIds(authorIds)
	return comments.map((comment) => ({
		...comment,
		author: authors.find((foundAuthor) => foundAuthor.id === comment.authorId),
	}))
}

export const getCommentCount = async (tweetId) => {
	const comments = await commentDataSource.findCommentsByTweetId(tweetId)
	return comments.length
}

export const getCommentsByTweetId = async (tweetId) => {
	const comments = await commentDataSource.findCommentsByTweetId(tweetId)
	return addAuthorToComments(sortCommentsByCreatedAtDesc(comments))
}

export const addComment = async (tweetId, authorId, body) => {
	const trimmedBody = body.trim()
	if (!trimmedBody) {
		throw new Error('comment/empty-body')
	}
	if (trimmedBody.length > MAX_COMMENT_LENGTH) {
		throw new Error('comment/body-too-long')
	}
	return commentDataSource.saveComment({
		tweetId,
		authorId,
		body: trimmedBody,
		createdAt: new Date().toISOString(),
	})
}