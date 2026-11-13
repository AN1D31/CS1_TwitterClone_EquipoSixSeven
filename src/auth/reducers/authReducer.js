import { authActionTypes } from '../types/authActionTypes'

export const authReducer = (authState, action) => {
	switch (action.type) {
		case authActionTypes.login:
			return { isLoggedIn: true, currentUser: action.payload }
		case authActionTypes.logout:
			return { isLoggedIn: false, currentUser: null }
		default:
			return authState
	}
}