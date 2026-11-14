export const applyFollowChanges = (followedIds, followChanges) => {
	const currentIds = new Set(followedIds)
	Object.entries(followChanges).forEach(([userId, isFollowed]) => {
		if (isFollowed) currentIds.add(userId)
		else currentIds.delete(userId)
	})
	return currentIds
}