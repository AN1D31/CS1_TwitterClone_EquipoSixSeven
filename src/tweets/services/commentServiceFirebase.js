import { addDoc, collection, query, where } from 'firebase/firestore'
import { getFirebaseDb } from '../../firebase/config'
import { getDocumentsData } from '../../firebase/firestoreHelpers'

const COMMENTS_COLLECTION = 'comments'

const getCommentsCollection = () => collection(getFirebaseDb(), COMMENTS_COLLECTION)

export const findCommentsByTweetId = (tweetId) => {
	const commentsQuery = query(getCommentsCollection(), where('tweetId', '==', tweetId))
	return getDocumentsData(commentsQuery)
}

export const saveComment = async (comment) => {
	const newDocument = await addDoc(getCommentsCollection(), comment)
	return { ...comment, id: newDocument.id }
}