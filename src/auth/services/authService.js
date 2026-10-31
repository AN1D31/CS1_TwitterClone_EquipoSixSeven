import { USE_MOCKS } from '../../firebase/dataSourceMode'
import {
	getUserByEmail,
	getUserById,
	getUserByUsername,
	saveUser,
} from '../../users/services/userService'
import * as authServiceFirebase from './authServiceFirebase'
import * as authServiceMock from './authServiceMock'

// Users are always read and saved through userService. Only the credentials
// (password check, account creation) depend on the data source.
const authDataSource = USE_MOCKS ? authServiceMock : authServiceFirebase

const buildUsernameFromEmail = (email) => {
	return email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '')
}

const buildAvailableUsername = async (email) => {
	const baseUsername = buildUsernameFromEmail(email)
	let candidateUsername = baseUsername
	while (await getUserByUsername(candidateUsername)) {
		candidateUsername = `${baseUsername}${Math.floor(Math.random() * 10000)}`
	}
	return candidateUsername
}

export const registerUser = async ({ fullName, username, email, password }) => {
	const normalizedUsername = username.trim().toLowerCase()
	const normalizedEmail = email.trim().toLowerCase()

	if (await getUserByUsername(normalizedUsername)) {
		throw new Error('auth/username-already-in-use')
	}
	if (await getUserByEmail(normalizedEmail)) {
		throw new Error('auth/email-already-in-use')
	}

	const newUserId = await authDataSource.createAccount({
		email: normalizedEmail,
		password,
	})
	return saveUser({
		id: newUserId,
		fullName: fullName.trim(),
		username: normalizedUsername,
		email: normalizedEmail,
		avatarUrl: null,
		createdAt: new Date().toISOString(),
	})
}

export const loginWithUsernameAndPassword = async (username, password) => {
	const foundUser = await getUserByUsername(username.trim().toLowerCase())
	if (!foundUser) {
		throw new Error('auth/user-not-found')
	}
	await authDataSource.verifyPassword(foundUser, password)
	return foundUser
}

// Real Google sign-in with Firebase Auth. The first time, the Google account
// gets a profile in the app model so the rest of the services can find it.
export const loginWithGoogle = async () => {
	const googleAccount = await authServiceFirebase.signInWithGoogleAccount()
	const existingUser = await getUserById(googleAccount.uid)
	if (existingUser) {
		return existingUser
	}
	return saveUser({
		id: googleAccount.uid,
		fullName: googleAccount.displayName ?? buildUsernameFromEmail(googleAccount.email),
		username: await buildAvailableUsername(googleAccount.email),
		email: googleAccount.email,
		avatarUrl: googleAccount.photoURL,
		createdAt: googleAccount.createdAt,
	})
}

export const logoutUser = async () => {
	await authDataSource.signOutAccount()
}