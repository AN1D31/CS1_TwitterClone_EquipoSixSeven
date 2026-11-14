import { mockTweets } from '../data/mockTweets'

const currentTweets = [...mockTweets]

export const findTweetsByAuthorIds = async (authorIds) => {
	return currentTweets.filter((tweet) => authorIds.includes(tweet.authorId))
}

export const findLatestTweets = async (maxTweets) => {
	const newestFirst = [...currentTweets].sort(
		(firstTweet, secondTweet) =>
			new Date(secondTweet.createdAt) - new Date(firstTweet.createdAt),
	)
	return newestFirst.slice(0, maxTweets)
}

export const findTweetsByIds = async (tweetIds) => {
	return currentTweets.filter((tweet) => tweetIds.includes(tweet.id))
}

export const findTweetById = async (tweetId) => {
	return currentTweets.find((tweet) => tweet.id === tweetId) ?? null
}

export const saveTweet = async (tweet) => {
	const savedTweet = { ...tweet, id: `tweet-${Date.now()}` }
	currentTweets.push(savedTweet)
	return savedTweet
}