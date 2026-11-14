import { collection, deleteDoc, doc, query, setDoc, where } from 'firebase/firestore'
import { getFirebaseDb } from '../../firebase/config'
import { getDocumentsData } from '../../firebase/firestoreHelpers'

// One document per like. The id is "tweetId_userId", so a user can like a tweet only once.
const LIKES_COLLECTION = 'likes'

const getLikesCollection = () => collection(getFirebaseDb(), LIKES_COLLECTION)

const buildLikeDocumentId = (tweetId, userId) => `${tweetId}_${userId}`

const removeDocumentId = ({ tweetId, userId, createdAt }) => {
	return { tweetId, userId, createdAt }
}

export const findLikesByTweetId = async (tweetId) => {
	const likesQuery = query(getLikesCollection(), where('tweetId', '==', tweetId))
	const likeDocuments = await getDocumentsData(likesQuery)
	return likeDocuments.map(removeDocumentId)
}

export const saveLike = async (like) => {
	const likeDocumentId = buildLikeDocumentId(like.tweetId, like.userId)
	await setDoc(doc(getLikesCollection(), likeDocumentId), like)
	return like
}

export const deleteLike = async (tweetId, userId) => {
	await deleteDoc(doc(getLikesCollection(), buildLikeDocumentId(tweetId, userId)))
}