import { useEffect, useMemo, useRef } from 'react'
import { getMediaType } from '../../cloudinary/mediaUploadService'
import { TweetMedia } from './TweetMedia'
import './tweetMedia.css'

export const TweetMediaPicker = ({ mediaFile, onMediaChange, disabled }) => {
	const fileInputRef = useRef(null)
	const previewUrl = useMemo(
		() => (mediaFile ? URL.createObjectURL(mediaFile) : null),
		[mediaFile],
	)

	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl)
			}
		}
	}, [previewUrl])

	const handleFileChange = (event) => {
		const [selectedFile = null] = event.target.files
		event.target.value = ''
		onMediaChange(selectedFile)
	}

	return (
		<div className="tweet-media-picker">
			{mediaFile && (
				<div className="tweet-media-picker__preview">
					<TweetMedia mediaUrl={previewUrl} mediaType={getMediaType(mediaFile)} />
					<button
						type="button"
						className="tweet-media-picker__remove"
						onClick={() => onMediaChange(null)}
						disabled={disabled}
					>
						Quitar
					</button>
				</div>
			)}
			<button
				type="button"
				className="tweet-media-picker__button"
				onClick={() => fileInputRef.current.click()}
				disabled={disabled}
			>
				{mediaFile ? 'Cambiar foto o video' : 'Agregar foto o video'}
			</button>
			<input
				ref={fileInputRef}
				className="tweet-media-picker__input"
				type="file"
				accept="image/*,video/*"
				onChange={handleFileChange}
			/>
		</div>
	)
}
