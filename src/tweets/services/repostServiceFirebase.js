import { collection, deleteDoc, doc, query, setDoc, where } from 'firebase/firestore'
import { getFirebaseDb } from '../../firebase/config'
import { getDocumentsData, queryInChunks } from '../../firebase/firestoreHelpers'

const REPOSTS_COLLECTION = 'reposts'

const getRepostsCollection = () => collection(getFirebaseDb(), REPOSTS_COLLECTION)

const buildRepostDocumentId = (tweetId, userId) => `${tweetId}_${userId}`

const removeDocumentId = ({ tweetId, userId, createdAt }) => {
	return { tweetId, userId, createdAt }
}

export const findRepostsByTweetId = async (tweetId) => {
	const repostsQuery = query(getRepostsCollection(), where('tweetId', '==', tweetId))
	const repostDocuments = await getDocumentsData(repostsQuery)
	return repostDocuments.map(removeDocumentId)
}

export const findRepostsByUserIds = async (userIds) => {
	const repostDocuments = await queryInChunks(userIds, (userIdsChunk) =>
		query(getRepostsCollection(), where('userId', 'in', userIdsChunk)),
	)
	return repostDocuments.map(removeDocumentId)
}

export const saveRepost = async (repost) => {
	const repostDocumentId = buildRepostDocumentId(repost.tweetId, repost.userId)
	await setDoc(doc(getRepostsCollection(), repostDocumentId), repost)
	return repost
}

export const deleteRepost = async (tweetId, userId) => {
	await deleteDoc(doc(getRepostsCollection(), buildRepostDocumentId(tweetId, userId)))
}