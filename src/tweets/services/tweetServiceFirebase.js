import { addDoc, collection, query, where } from 'firebase/firestore'
import { getFirebaseDb } from '../../firebase/config'
import { queryInChunks } from '../../firebase/firestoreHelpers'

const TWEETS_COLLECTION = 'tweets'

const getTweetsCollection = () => collection(getFirebaseDb(), TWEETS_COLLECTION)

export const findTweetsByAuthorIds = async (authorIds) => {
	return queryInChunks(authorIds, (authorIdsChunk) =>
		query(getTweetsCollection(), where('authorId', 'in', authorIdsChunk)),
	)
}

export const saveTweet = async (tweet) => {
	const newDocument = await addDoc(getTweetsCollection(), tweet)
	return { ...tweet, id: newDocument.id }
}