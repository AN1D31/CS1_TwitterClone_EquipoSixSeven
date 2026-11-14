import { useEffect, useMemo } from 'react'
import { UserAvatar } from '../../users/components/UserAvatar'

export const AvatarPicker = ({ fullName, avatarFile, onAvatarChange }) => {
	const previewUrl = useMemo(
		() => (avatarFile ? URL.createObjectURL(avatarFile) : null),
		[avatarFile],
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
		onAvatarChange(selectedFile)
	}

	return (
		<div className="avatar-picker">
			<UserAvatar fullName={fullName} avatarUrl={previewUrl} size={96} />
			<label className="avatar-picker__button" htmlFor="register-avatar">
				{avatarFile ? 'Cambiar foto' : 'Elegir foto de perfil (opcional)'}
			</label>
			<input
				id="register-avatar"
				className="avatar-picker__input"
				type="file"
				accept="image/*"
				onChange={handleFileChange}
			/>
			{avatarFile && (
				<button
					type="button"
					className="avatar-picker__remove"
					onClick={() => onAvatarChange(null)}
				>
					Quitar foto
				</button>
			)}
		</div>
	)
}