import { mockUsers } from '../data/mockUsers'

// Mock data source. A copy is used so the imported data is never mutated,
// and every user saved here (registration, Google login) is visible to all services.
const currentUsers = [...mockUsers]

export const findUserById = async (userId) => {
	return currentUsers.find((user) => user.id === userId) ?? null
}

export const findUserByUsername = async (username) => {
	return currentUsers.find((user) => user.username === username) ?? null
}

export const findUserByEmail = async (email) => {
	return currentUsers.find((user) => user.email === email) ?? null
}

export const findUsersByIds = async (userIds) => {
	return currentUsers.filter((user) => userIds.includes(user.id))
}

export const saveUser = async (user) => {
	currentUsers.push(user)
	return user
}