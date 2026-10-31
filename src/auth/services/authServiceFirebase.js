import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'
import { getFirebaseAuth } from '../../firebase/config'

// Firebase Auth only knows email and password, so the username is resolved
// to an email before calling it (see authService).
const WRONG_PASSWORD_CODES = ['auth/wrong-password', 'auth/invalid-credential']

// Pages read error.message, so Firebase errors are translated to our own codes.
const toAppAuthError = (error) => {
	if (WRONG_PASSWORD_CODES.includes(error.code)) {
		return new Error('auth/wrong-password')
	}
	return new Error(error.code ?? error.message)
}

export const createAccount = async ({ email, password }) => {
	try {
		const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password)
		return credential.user.uid
	} catch (error) {
		throw toAppAuthError(error)
	}
}

export const verifyPassword = async (user, password) => {
	try {
		await signInWithEmailAndPassword(getFirebaseAuth(), user.email, password)
	} catch (error) {
		throw toAppAuthError(error)
	}
}

// Real Google sign-in. It works in both mock and Firebase mode.
export const signInWithGoogleAccount = async () => {
	try {
		const credential = await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider())
		const { uid, displayName, email, photoURL, metadata } = credential.user
		const createdAt = new Date(metadata.creationTime).toISOString()
		return { uid, displayName, email, photoURL, createdAt }
	} catch (error) {
		throw toAppAuthError(error)
	}
}

export const signOutAccount = async () => {
	await signOut(getFirebaseAuth())
}