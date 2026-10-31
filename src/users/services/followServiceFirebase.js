import { collection, doc, query, setDoc, where } from 'firebase/firestore'
import { getFirebaseDb } from '../../firebase/config'
import { getDocumentsData } from '../../firebase/firestoreHelpers'

const FOLLOWS_COLLECTION = 'follows'

const getFollowsCollection = () => collection(getFirebaseDb(), FOLLOWS_COLLECTION)

const removeDocumentId = ({ followerId, followingId, createdAt }) => {
	return { followerId, followingId, createdAt }
}

const findFollowsByField = async (fieldName, fieldValue) => {
	const followsQuery = query(getFollowsCollection(), where(fieldName, '==', fieldValue))
	const followDocuments = await getDocumentsData(followsQuery)
	return followDocuments.map(removeDocumentId)
}

export const findFollowsByFollowerId = (followerId) => findFollowsByField('followerId', followerId)

export const findFollowsByFollowingId = (followingId) => findFollowsByField('followingId', followingId)

export const saveFollow = async (follow) => {
	const followDocumentId = `${follow.followerId}_${follow.followingId}`
	await setDoc(doc(getFollowsCollection(), followDocumentId), follow)
	return follow
}