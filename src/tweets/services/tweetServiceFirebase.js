import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	documentId,
	getDoc,
	limit,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
import { getFirebaseDb } from '../../firebase/config'
import { getDocumentsData, queryInChunks } from '../../firebase/firestoreHelpers'

const TWEETS_COLLECTION = 'tweets'

const getTweetsCollection = () => collection(getFirebaseDb(), TWEETS_COLLECTION)

const buildLatestTweetsQuery = (maxTweets) => {
	return query(getTweetsCollection(), orderBy('createdAt', 'desc'), limit(maxTweets))
}

export const findTweetsByAuthorIds = async (authorIds) => {
	return queryInChunks(authorIds, (authorIdsChunk) =>
		query(getTweetsCollection(), where('authorId', 'in', authorIdsChunk)),
	)
}

export const findTweetsByIds = async (tweetIds) => {
	return queryInChunks(tweetIds, (tweetIdsChunk) =>
		query(getTweetsCollection(), where(documentId(), 'in', tweetIdsChunk)),
	)
}

export const findTweetById = async (tweetId) => {
	const tweetSnapshot = await getDoc(doc(getTweetsCollection(), tweetId))
	return tweetSnapshot.exists() ? { id: tweetSnapshot.id, ...tweetSnapshot.data() } : null
}

export const saveTweet = async (tweet) => {
	const newDocument = await addDoc(getTweetsCollection(), tweet)
	return { ...tweet, id: newDocument.id }
}

export const deleteTweet = async (tweetId) => {
	await deleteDoc(doc(getTweetsCollection(), tweetId))
}

export const findLatestTweets = (maxTweets) => {
	return getDocumentsData(buildLatestTweetsQuery(maxTweets))
}

export const listenToLatestTweets = (maxTweets, onTweets) => {
	const mapDocuments = (snapshot) => {
		return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
	}
	return onSnapshot(
		buildLatestTweetsQuery(maxTweets),
		(snapshot) => onTweets(mapDocuments(snapshot)),
		(listenError) => console.error('Error listening to tweets:', listenError),
	)
}