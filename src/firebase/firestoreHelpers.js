import { getDocs } from 'firebase/firestore'

// Firestore "in" queries accept a limited number of values, so lists of ids
// are split into small groups and queried one group at a time.
const MAX_VALUES_PER_IN_QUERY = 10

export const splitIntoChunks = (items, chunkSize = MAX_VALUES_PER_IN_QUERY) => {
	const chunks = []
	for (let startIndex = 0; startIndex < items.length; startIndex += chunkSize) {
		chunks.push(items.slice(startIndex, startIndex + chunkSize))
	}
	return chunks
}

export const getDocumentsData = async (firestoreQuery) => {
	const snapshot = await getDocs(firestoreQuery)
	return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
}

// Runs one query per group of ids and joins every result in a single list.
export const queryInChunks = async (ids, buildQueryForChunk) => {
	const chunkResults = await Promise.all(
		splitIntoChunks(ids).map((idsChunk) =>
			getDocumentsData(buildQueryForChunk(idsChunk)),
		),
	)
	return chunkResults.flat()
}