import { useCallback, useEffect, useRef, useState } from 'react'
import { subscribeToLatestTweets } from '../services/tweetService'

export const useNewTweetsCount = (shouldCountTweet) => {
	const [newTweetCount, setNewTweetCount] = useState(0)
	const latestIdsRef = useRef(new Set())
	const seenIdsRef = useRef(null)

	useEffect(() => {
		const handleLatestTweets = (latestTweets) => {
			latestIdsRef.current = new Set(latestTweets.map((tweet) => tweet.id))
			if (seenIdsRef.current === null) seenIdsRef.current = latestIdsRef.current
			const unseenTweets = latestTweets.filter(
				(tweet) => !seenIdsRef.current.has(tweet.id) && shouldCountTweet(tweet),
			)
			setNewTweetCount(unseenTweets.length)
		}

		return subscribeToLatestTweets(handleLatestTweets)
	}, [shouldCountTweet])

	const markNewTweetsAsSeen = useCallback(() => {
		seenIdsRef.current = latestIdsRef.current
		setNewTweetCount(0)
	}, [])

	return { newTweetCount, markNewTweetsAsSeen }
}