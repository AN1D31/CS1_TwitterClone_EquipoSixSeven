import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from './cloudinaryConfig.js'

const BYTES_PER_MEGABYTE = 1024 * 1024

export const MAX_IMAGE_SIZE_MB = 10
export const MAX_VIDEO_SIZE_MB = 100

const maxSizeInMegabytesByMediaType = {
	image: MAX_IMAGE_SIZE_MB,
	video: MAX_VIDEO_SIZE_MB,
}

export const getMediaType = (mediaFile) => mediaFile.type.split('/')[0]

const assertCloudinaryIsConfigured = () => {
	if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
		throw new Error('media/not-configured')
	}
}

const assertMediaFileIsValid = (mediaFile) => {
	const maxSizeInMegabytes = maxSizeInMegabytesByMediaType[getMediaType(mediaFile)]
	if (!maxSizeInMegabytes) {
		throw new Error('media/unsupported-type')
	}
	if (mediaFile.size > maxSizeInMegabytes * BYTES_PER_MEGABYTE) {
		throw new Error('media/too-large')
	}
}

const buildUploadUrl = () => {
	return `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`
}

const postMediaFile = async (mediaFile) => {
	const formData = new FormData()
	formData.append('file', mediaFile)
	formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
	try {
		return await fetch(buildUploadUrl(), {
			method: 'POST',
			body: formData,
		})
	} catch {
		throw new Error('media/upload-failed')
	}
}

export const uploadMediaToCloudinary = async (mediaFile) => {
	assertCloudinaryIsConfigured()
	assertMediaFileIsValid(mediaFile)
	const uploadResponse = await postMediaFile(mediaFile)
	if (!uploadResponse.ok) {
		throw new Error('media/upload-failed')
	}
	const uploadMedia = await uploadResponse.json()
	return uploadMedia.secure_url
}

export const uploadImageToCloudinary = async (imageFile) => {
	if (getMediaType(imageFile) !== 'image') {
		throw new Error('media/unsupported-type')
	}
	return uploadMediaToCloudinary(imageFile)
}
