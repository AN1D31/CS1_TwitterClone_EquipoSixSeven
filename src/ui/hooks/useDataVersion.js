import { useEffect, useState } from 'react'
import { subscribeToDataChanges } from '../events/dataChangeEvents'

const DEBOUNCE_MS = 250

export const useDataVersion = (kinds, origins = null) => {
	const [version, setVersion] = useState(0)

	useEffect(() => {
		let timerId = null
		const bumpVersion = () => {
			timerId = null
			setVersion((previousVersion) => previousVersion + 1)
		}
		const handleChange = (kind, origin) => {
			if (!kinds.includes(kind)) return
			if (origins && !origins.includes(origin)) return
			if (timerId !== null) clearTimeout(timerId)
			timerId = setTimeout(bumpVersion, DEBOUNCE_MS)
		}
		const unsubscribe = subscribeToDataChanges(handleChange)

		return () => {
			unsubscribe()
			if (timerId !== null) clearTimeout(timerId)
		}
	}, [kinds, origins])

	return version
}
