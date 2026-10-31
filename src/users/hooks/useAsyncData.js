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

		loadFromService()
			.then((result) => updateIfActive({ result, isLoading: false, error: null }))
			.catch((loadError) => updateIfActive({ result: null, isLoading: false, error: loadError.message }))

		return () => {
			isActive = false
		}
	}, [loadFromService])

	return state
}
