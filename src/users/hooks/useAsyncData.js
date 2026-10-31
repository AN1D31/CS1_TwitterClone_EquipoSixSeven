import { useEffect, useState } from 'react'

const initialState = { result: null, isLoading: true, error: null }

// Runs an async loader (a service call) and exposes its result.
// The loading function must be stable (wrap it in useCallback) to avoid infinite reloads.
export const useAsyncData = (loadFromService) => {
	const [state, setState] = useState(initialState)

	useEffect(() => {
		let isActive = true
		const updateIfActive = (nextState) => {
			if (isActive) setState(nextState)
		}
		const handleLoadError = (loadError) => {
			// Logged so the real cause (e.g. Firestore permissions) is visible in the browser console.
			console.error('Error loading data:', loadError)
			updateIfActive({ result: null, isLoading: false, error: loadError.message })
		}

		loadFromService()
			.then((result) => updateIfActive({ result, isLoading: false, error: null }))
			.catch(handleLoadError)

		return () => {
			isActive = false
		}
	}, [loadFromService])

	return state
}
