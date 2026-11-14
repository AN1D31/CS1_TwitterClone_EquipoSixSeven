const listeners = new Set()

export const ORIGIN_LOCAL = 'local'
export const ORIGIN_REMOTE = 'remote'

export const notifyDataChanged = (kind, origin = ORIGIN_LOCAL) => {
	listeners.forEach((listener) => listener(kind, origin))
}

export const subscribeToDataChanges = (listener) => {
	listeners.add(listener)
	return () => listeners.delete(listener)
}
