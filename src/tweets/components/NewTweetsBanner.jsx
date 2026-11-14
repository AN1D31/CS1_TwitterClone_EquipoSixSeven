import './newTweetsBanner.css'

export const NewTweetsBanner = ({ count, onShow }) => {
	if (count === 0) return null

	const label = count === 1 ? 'Mostrar 1 tweet nuevo' : `Mostrar ${count} tweets nuevos`

	return (
		<div className="new-tweets-banner" role="status">
			<button type="button" className="new-tweets-banner__button" onClick={onShow}>
				{label}
			</button>
		</div>
	)
}