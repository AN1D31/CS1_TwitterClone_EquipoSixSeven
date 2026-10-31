import { USE_MOCKS } from '../../firebase/dataSourceMode'
import * as userServiceFirebase from './userServiceFirebase'
import * as userServiceMock from './userServiceMock'

// Pages and components always call this file. Only the data source changes
// (mock or Firebase), so the rest of the app does not care where users come from.
const userDataSource = USE_MOCKS ? userServiceMock : userServiceFirebase

export const sortUsersByFullNameAsc = (users) => {
	return [...users].sort((firstUser, secondUser) =>
		firstUser.fullName.localeCompare(secondUser.fullName, 'es'),
	)
}

export const getUserById = (userId) => userDataSource.findUserById(userId)

export const getUserByUsername = (username) => userDataSource.findUserByUsername(username)

export const getUserByEmail = (email) => userDataSource.findUserByEmail(email)

export const getUsersByIds = async (userIds) => {
	if (userIds.length === 0) {
		return []
	}
	return userDataSource.findUsersByIds(userIds)
}

export const saveUser = (user) => userDataSource.saveUser(user)