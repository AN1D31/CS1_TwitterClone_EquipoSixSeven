import { MAX_TWEET_LENGTH } from '../services/tweetService'

const WARNING_REMAINING_CHARACTERS = 20

const getCounterModifier = (remainingCharacters) => {
	if (remainingCharacters < 0) return 'compose-counter--over'
	if (remainingCharacters <= WARNING_REMAINING_CHARACTERS) return 'compose-counter--warning'
	return ''
}

// Shows how many characters are used and warns when the tweet is close to or over the limit.
export const TweetCharacterCounter = ({ characterCount }) => {
	const remainingCharacters = MAX_TWEET_LENGTH - characterCount
	const isOverLimit = remainingCharacters < 0

	return (
		<p
			id="tweet-character-counter"
			className={`compose-counter ${getCounterModifier(remainingCharacters)}`}
			aria-live="polite"
		>
			{characterCount}/{MAX_TWEET_LENGTH}
			{isOverLimit && ` · ${Math.abs(remainingCharacters)} de más`}
		</p>
	)
}