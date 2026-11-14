/* global process */
import { initializeApp } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { mockFollows } from '../src/users/data/mockFollows.js'
import { mockUsers } from '../src/users/data/mockUsers.js'
import { mockTweets } from '../src/tweets/data/mockTweets.js'


const DEMO_PASSWORD = 'Clave1234'

const firebaseConfig = {
	apiKey: process.env.VITE_FIREBASE_API_KEY,
	authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VITE_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

const toIsoDate = (dateText) => new Date(dateText).toISOString()

const createOrSignIn = async (email) => {
	try {
		const credential = await createUserWithEmailAndPassword(auth, email, DEMO_PASSWORD)
		return credential.user.uid
	} catch (error) {
		if (error.code !== 'auth/email-already-in-use') {
			throw error
		}
		const credential = await signInWithEmailAndPassword(auth, email, DEMO_PASSWORD)
		return credential.user.uid
	}
}

const createDocumentIfMissing = async (collectionName, documentId, data) => {
	const documentReference = doc(db, collectionName, documentId)
	const existingDocument = await getDoc(documentReference)
	if (existingDocument.exists()) {
		return false
	}
	await setDoc(documentReference, data)
	return true
}

const seedUsers = async () => {
	const uidsByMockId = {}
	for (const mockUser of mockUsers) {
		const uid = await createOrSignIn(mockUser.email)
		const { id, ...userFields } = mockUser
		await setDoc(doc(db, 'users', uid), {
			...userFields,
			createdAt: toIsoDate(mockUser.createdAt),
		})
		uidsByMockId[id] = uid
		console.log(`User ready: @${mockUser.username}`)
	}
	return uidsByMockId
}

const seedTweetsOf = async (mockUserId, uidsByMockId) => {
	const userTweets = mockTweets.filter((mockTweet) => mockTweet.authorId === mockUserId)
	for (const mockTweet of userTweets) {
		await createDocumentIfMissing('tweets', `seed-${mockTweet.id}`, {
			authorId: uidsByMockId[mockTweet.authorId],
			body: mockTweet.body,
			createdAt: toIsoDate(mockTweet.createdAt),
			mediaUrl: null,
			mediaType: null,
		})
	}
}

const seedFollowsOf = async (mockUserId, uidsByMockId) => {
	const userFollows = mockFollows.filter((mockFollow) => mockFollow.followerId === mockUserId)
	for (const mockFollow of userFollows) {
		const followerId = uidsByMockId[mockFollow.followerId]
		const followingId = uidsByMockId[mockFollow.followingId]
		await createDocumentIfMissing('follows', `${followerId}_${followingId}`, {
			followerId,
			followingId,
			createdAt: toIsoDate(mockFollow.createdAt),
		})
	}
}

const seedTweetsAndFollows = async (uidsByMockId) => {
	for (const mockUser of mockUsers) {
		await signInWithEmailAndPassword(auth, mockUser.email, DEMO_PASSWORD)
		await seedTweetsOf(mockUser.id, uidsByMockId)
		await seedFollowsOf(mockUser.id, uidsByMockId)
		console.log(`Tweets and follows ready: @${mockUser.username}`)
	}
}

const runSeed = async () => {
	const uidsByMockId = await seedUsers()
	await seedTweetsAndFollows(uidsByMockId)
	await signOut(auth)
	console.log(`Done: ${mockUsers.length} users. Password for all of them: ${DEMO_PASSWORD}`)
}

runSeed()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error('Seed failed:', error.code ?? error.message)
		process.exit(1)
	})
