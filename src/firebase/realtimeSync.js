import { collection, onSnapshot } from 'firebase/firestore'
import { ORIGIN_REMOTE, notifyDataChanged } from '../ui/events/dataChangeEvents'
import { USE_MOCKS } from './dataSourceMode'
import { getFirebaseDb } from './config'

const WATCHED_COLLECTIONS = [
	{ name: 'tweets', kind: 'tweets', changeTypes: ['removed'] },
	{ name: 'likes', kind: 'likes', changeTypes: ['added', 'removed'] },
	{ name: 'reposts', kind: 'reposts', changeTypes: ['added', 'removed'] },
	{ name: 'comments', kind: 'comments', changeTypes: ['added', 'removed'] },
	{ name: 'follows', kind: 'follows', changeTypes: ['added', 'removed'] },
]

const isRemoteChange = (change, changeTypes) => {
	return changeTypes.includes(change.type) && !change.doc.metadata.hasPendingWrites
}

const listenToCollection = ({ name, kind, changeTypes }) => {
	let isFirstSnapshot = true
	const handleSnapshot = (snapshot) => {
		if (isFirstSnapshot) {
			isFirstSnapshot = false
			return
		}
		const hasRemoteChange = snapshot
			.docChanges()
			.some((change) => isRemoteChange(change, changeTypes))
		if (hasRemoteChange) notifyDataChanged(kind, ORIGIN_REMOTE)
	}
	const handleError = (listenError) => console.error(`Error listening to ${name}:`, listenError)

	return onSnapshot(collection(getFirebaseDb(), name), handleSnapshot, handleError)
}

export const startRealtimeSync = () => {
	if (USE_MOCKS) return () => {}

	const stopListeners = WATCHED_COLLECTIONS.map(listenToCollection)
	return () => stopListeners.forEach((stopListener) => stopListener())
}
