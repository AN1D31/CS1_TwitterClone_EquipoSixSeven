import './tweetMedia.css'

export const TweetMedia = ({ mediaUrl, mediaType }) => {
	if (!mediaUrl) {
		return null
	}
	if (mediaType === 'video') {
		return <video className="tweet-media" src={mediaUrl} controls preload="metadata" />
	}
	return (
		<img className="tweet-media" src={mediaUrl} alt="Imagen adjunta al tweet" loading="lazy" />
	)
}
