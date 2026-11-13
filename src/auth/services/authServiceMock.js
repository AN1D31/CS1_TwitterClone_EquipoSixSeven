// Mock credentials source (Milestone 1). Accounts only exist in memory.
// Seeded mock users share this password; registered users keep their own.
const DEFAULT_MOCK_PASSWORD = 'Clave1234'

const passwordsByUserId = {}

export const createAccount = async ({ password }) => {
	const newUserId = `user-${Date.now()}`
	passwordsByUserId[newUserId] = password
	return newUserId
}

export const verifyPassword = async (user, password) => {
	const expectedPassword = passwordsByUserId[user.id] ?? DEFAULT_MOCK_PASSWORD
	if (password !== expectedPassword) {
		throw new Error('auth/wrong-password')
	}
}

export const signOutAccount = async () => {}