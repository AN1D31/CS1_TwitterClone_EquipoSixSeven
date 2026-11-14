import { getMediaType, uploadMediaToCloudinary } from '../../cloudinary/mediaUploadService'
import { USE_MOCKS } from '../../firebase/dataSourceMode'
import { getFollowingIdsByUserId } from '../../users/services/followService'
import { getUsersByIds } from '../../users/services/userService'
import { getRepostsByUserIds } from './repostService'
import * as tweetServiceFirebase from './tweetServiceFirebase'
import * as tweetServiceMock from './tweetServiceMock'

export const MAX_TWEET_LENGTH = 280

const MAX_EXPLORE_TWEETS = 50

const tweetDataSource = USE_MOCKS ? tweetServiceMock : tweetServiceFirebase

const sortTweetsBySortDateDesc = (tweets) => {
	return [...tweets].sort(
		(firstTweet, secondTweet) => new Date(secondTweet.sortDate) - new Date(firstTweet.sortDate),
	)
}

const sortRepostsByCreatedAtDesc = (reposts) => {
	return [...reposts].sort(
		(firstRepost, secondRepost) =>
			new Date(secondRepost.createdAt) - new Date(firstRepost.createdAt),
	)
}

const mergeTweetsAndReposts = (authoredTweets, reposts, repostedTweets) => {
	const entriesByTweetId = new Map(
		authoredTweets.map((tweet) => [tweet.id, { ...tweet, sortDate: tweet.createdAt }]),
	)
	const repostedTweetsById = new Map(repostedTweets.map((tweet) => [tweet.id, tweet]))
	sortRepostsByCreatedAtDesc(reposts).forEach((repost) => {
		const repostedTweet = repostedTweetsById.get(repost.tweetId)
		if (repostedTweet && !entriesByTweetId.has(repost.tweetId)) {
			entriesByTweetId.set(repost.tweetId, {
				...repostedTweet,
				sortDate: repost.createdAt,
				repostedByUserId: repost.userId,
			})
		}
	})
	return [...entriesByTweetId.values()]
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

const addReposterToTweets = async (tweets) => {
	const reposterIds = [...new Set(tweets.map((tweet) => tweet.repostedByUserId).filter(Boolean))]
	const reposters = await getUsersByIds(reposterIds)
	return tweets.map((tweet) => {
		const reposter = reposters.find((foundUser) => foundUser.id === tweet.repostedByUserId)
		if (!reposter) {
			return tweet
		}
		return {
			...tweet,
			repostedByFullName: reposter.fullName,
			repostedByUsername: reposter.username,
		}
	})
}

const getTimelineTweetsByUserIds = async (userIds) => {
	const [authoredTweets, reposts] = await Promise.all([
		tweetDataSource.findTweetsByAuthorIds(userIds),
		getRepostsByUserIds(userIds),
	])
	const repostedTweetIds = [...new Set(reposts.map((repost) => repost.tweetId))]
	const repostedTweets = await tweetDataSource.findTweetsByIds(repostedTweetIds)
	const timelineTweets = mergeTweetsAndReposts(authoredTweets, reposts, repostedTweets)
	const tweetsWithAuthors = await addAuthorToTweets(sortTweetsBySortDateDesc(timelineTweets))
	return addReposterToTweets(tweetsWithAuthors)
}

export const getTweetsByUserId = (userId) => {
	return getTimelineTweetsByUserIds([userId])
}

export const getAuthoredTweetsByUserId = async (userId) => {
	const authoredTweets = await tweetDataSource.findTweetsByAuthorIds([userId])
	const tweetsWithSortDate = authoredTweets.map((tweet) => ({
		...tweet,
		sortDate: tweet.createdAt,
	}))
	return addAuthorToTweets(sortTweetsBySortDateDesc(tweetsWithSortDate))
}

export const getRepostedTweetsByUserId = async (userId) => {
	const reposts = await getRepostsByUserIds([userId])
	const repostedTweetIds = [...new Set(reposts.map((repost) => repost.tweetId))]
	const repostedTweets = await tweetDataSource.findTweetsByIds(repostedTweetIds)
	const repostedTweetsById = new Map(repostedTweets.map((tweet) => [tweet.id, tweet]))
	const repostEntries = sortRepostsByCreatedAtDesc(reposts)
		.filter((repost) => repostedTweetsById.has(repost.tweetId))
		.map((repost) => ({
			...repostedTweetsById.get(repost.tweetId),
			sortDate: repost.createdAt,
			repostedByUserId: repost.userId,
		}))
	const tweetsWithAuthors = await addAuthorToTweets(repostEntries)
	return addReposterToTweets(tweetsWithAuthors)
}

export const getExploreTweetsByUserId = async (userId) => {
	const latestTweets = await tweetDataSource.findLatestTweets(MAX_EXPLORE_TWEETS)
	const tweetsFromOthers = latestTweets
		.filter((tweet) => tweet.authorId !== userId)
		.map((tweet) => ({ ...tweet, sortDate: tweet.createdAt }))
	return addAuthorToTweets(sortTweetsBySortDateDesc(tweetsFromOthers))
}

export const getTweetById = async (tweetId) => {
	const foundTweet = await tweetDataSource.findTweetById(tweetId)
	if (!foundTweet) {
		return null
	}
	const [tweetWithAuthor] = await addAuthorToTweets([foundTweet])
	return tweetWithAuthor
}

export const getFeedTweetsByUserId = async (userId) => {
	const followingIds = await getFollowingIdsByUserId(userId)
	return getTimelineTweetsByUserIds([userId, ...followingIds])
}

const uploadTweetMediaIfProvided = async (mediaFile) => {
	if (!mediaFile) {
		return { mediaUrl: null, mediaType: null }
	}
	const mediaUrl = await uploadMediaToCloudinary(mediaFile)
	return { mediaUrl, mediaType: getMediaType(mediaFile) }
}

export const createTweet = async (authorId, body, mediaFile = null) => {
	const trimmedBody = body.trim()
	if (trimmedBody.length === 0) {
		throw new Error('tweet/empty-body')
	}
	if (trimmedBody.length > MAX_TWEET_LENGTH) {
		throw new Error('tweet/body-too-long')
	}
	const { mediaUrl, mediaType } = await uploadTweetMediaIfProvided(mediaFile)
	const savedTweet = await tweetDataSource.saveTweet({
		authorId,
		body: trimmedBody,
		createdAt: new Date().toISOString(),
		mediaUrl,
		mediaType,
	})
	const [tweetWithAuthor] = await addAuthorToTweets([savedTweet])
	return tweetWithAuthor
}

