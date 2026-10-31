import { mockTweets } from '../data/mockTweets'

const currentTweets = [...mockTweets]

export const findTweetsByAuthorIds = async (authorIds) => {
	return currentTweets.filter((tweet) => authorIds.includes(tweet.authorId))
}

export const saveTweet = async (tweet) => {
	const savedTweet = { ...tweet, id: `tweet-${Date.now()}` }
	currentTweets.push(savedTweet)
	return savedTweet
}