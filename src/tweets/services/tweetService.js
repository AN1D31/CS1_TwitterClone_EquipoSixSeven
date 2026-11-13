import { USE_MOCKS } from '../../firebase/dataSourceMode'
import { getFollowingIdsByUserId } from '../../users/services/followService'
import { getUsersByIds } from '../../users/services/userService'
import * as tweetServiceFirebase from './tweetServiceFirebase'
import * as tweetServiceMock from './tweetServiceMock'

export const MAX_TWEET_LENGTH = 280

const tweetDataSource = USE_MOCKS ? tweetServiceMock : tweetServiceFirebase

const sortTweetsByCreatedAtDesc = (tweets) => {
	return [...tweets].sort(
		(firstTweet, secondTweet) =>
			new Date(secondTweet.createdAt) - new Date(firstTweet.createdAt),
	)
}

const addAuthorToTweets = async (tweets) => {
	const authorIds = [...new Set(tweets.map((tweet) => tweet.authorId))]
	const authors = await getUsersByIds(authorIds)
	return tweets.map((tweet) => {
		const author = authors.find((foundAuthor) => foundAuthor.id === tweet.authorId)
		return {
			...tweet,
			author,
			authorFullName: author?.fullName,
			authorUsername: author?.username,
		}
	})
}

const getSortedTweetsWithAuthorsByAuthorIds = async (authorIds) => {
	const foundTweets = await tweetDataSource.findTweetsByAuthorIds(authorIds)
	return addAuthorToTweets(sortTweetsByCreatedAtDesc(foundTweets))
}

export const getTweetsByUserId = (userId) => {
	return getSortedTweetsWithAuthorsByAuthorIds([userId])
}

export const getFeedTweetsByUserId = async (userId) => {
	const followingIds = await getFollowingIdsByUserId(userId)
	return getSortedTweetsWithAuthorsByAuthorIds([userId, ...followingIds])
}

export const createTweet = async (authorId, body) => {
	const trimmedBody = body.trim()
	if (trimmedBody.length === 0) {
		throw new Error('tweet/empty-body')
	}
	if (trimmedBody.length > MAX_TWEET_LENGTH) {
		throw new Error('tweet/body-too-long')
	}
	const savedTweet = await tweetDataSource.saveTweet({
		authorId,
		body: trimmedBody,
		createdAt: new Date().toISOString(),
	})
	const [tweetWithAuthor] = await addAuthorToTweets([savedTweet])
	return tweetWithAuthor
}