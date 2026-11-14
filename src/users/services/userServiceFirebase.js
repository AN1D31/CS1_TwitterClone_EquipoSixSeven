import { collection, doc, documentId, getDoc, limit, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { getFirebaseDb } from '../../firebase/config'
import { getDocumentsData, queryInChunks } from '../../firebase/firestoreHelpers'

const USERS_COLLECTION = 'users'

const getUsersCollection = () => collection(getFirebaseDb(), USERS_COLLECTION)

const findFirstUserByField = async (fieldName, fieldValue) => {
	const usersQuery = query(getUsersCollection(), where(fieldName, '==', fieldValue), limit(1))
	const [foundUser] = await getDocumentsData(usersQuery)
	return foundUser ?? null
}

export const findAllUsers = () => getDocumentsData(getUsersCollection())

export const findUserById = async (userId) => {
	const userSnapshot = await getDoc(doc(getUsersCollection(), userId))
	return userSnapshot.exists() ? { id: userSnapshot.id, ...userSnapshot.data() } : null
}

export const findUserByUsername = (username) => findFirstUserByField('username', username)

export const findUserByEmail = (email) => findFirstUserByField('email', email)

export const findUsersByIds = async (userIds) => {
	return queryInChunks(userIds, (userIdsChunk) =>
		query(getUsersCollection(), where(documentId(), 'in', userIdsChunk)),
	)
}

export const saveUser = async (user) => {
	const { id, ...userFields } = user
	await setDoc(doc(getUsersCollection(), id), userFields)
	return user
}

export const updateUserAvatarUrl = async (userId, avatarUrl) => {
	await updateDoc(doc(getUsersCollection(), userId), { avatarUrl })
	return findUserById(userId)
}