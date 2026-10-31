const tweetDateFormatter = new Intl.DateTimeFormat('es-CO', {
	dateStyle: 'medium',
	timeStyle: 'short',
})

export const formatTweetDate = (createdAt) => {
	return tweetDateFormatter.format(new Date(createdAt))
}