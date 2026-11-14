import { useRef, useState } from 'react'
import { MAX_IMAGE_SIZE_MB } from '../../cloudinary/mediaUploadService'
import { changeUserAvatar } from '../services/userService'
import './changeAvatar.css'

const changeAvatarErrorMessages = {
	'media/unsupported-type': 'La foto debe ser una imagen.',
	'media/file-too-large': `La foto es muy pesada. El máximo es ${MAX_IMAGE_SIZE_MB} MB.`,
	'media/upload-failed': 'No se pudo subir la foto. Intenta de nuevo.',
	'media/not-configured': 'La subida de fotos no está configurada todavía.',
}

const getChangeAvatarErrorMessage = (changeError) =>
	changeAvatarErrorMessages[changeError.message] ??
	'No se pudo cambiar la foto. Intenta de nuevo.'

const getButtonLabel = (isUploading, hasAvatar) => {
	if (isUploading) return 'Subiendo…'
	return hasAvatar ? 'Cambiar foto' : 'Agregar foto'
}

export const ChangeAvatarButton = ({ userId, hasAvatar, onAvatarChanged }) => {
	const fileInputRef = useRef(null)
	const [isUploading, setIsUploading] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)

	const handleFileChange = async (event) => {
		const [selectedFile] = event.target.files
		event.target.value = ''
		if (!selectedFile) {
			return
		}
		setIsUploading(true)
		setErrorMessage(null)
		try {
			const updatedUser = await changeUserAvatar(userId, selectedFile)
			onAvatarChanged(updatedUser)
		} catch (changeError) {
            console.error('Error changing avatar:', changeError)
			setErrorMessage(getChangeAvatarErrorMessage(changeError))
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<div className="change-avatar">
			<button
				type="button"
				className="change-avatar__button"
				onClick={() => fileInputRef.current.click()}
				disabled={isUploading}
			>
				{getButtonLabel(isUploading, hasAvatar)}
			</button>
			<input
				ref={fileInputRef}
				className="change-avatar__input"
				type="file"
				accept="image/*"
				onChange={handleFileChange}
			/>
			{errorMessage && <span className="change-avatar__error">{errorMessage}</span>}
		</div>
	)
}