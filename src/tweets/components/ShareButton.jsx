import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useDataVersion } from '../../ui/hooks/useDataVersion'
import { useToast } from '../../ui/hooks/useToast'
import { getRepostSummary, repostTweet, undoRepost } from '../services/repostService'
import { buildTweetUrl } from '../utils/buildTweetUrl'
import './tweetActions.css'

const WATCHED_KINDS = ['reposts']

const emptySummary = { repostCount: 0, isRepostedByViewer: false }

const buildNextSummary = ({ repostCount, isRepostedByViewer }) => {
	return {
		repostCount: isRepostedByViewer ? repostCount - 1 : repostCount + 1,
		isRepostedByViewer: !isRepostedByViewer,
	}
}

const useCloseMenuOnOutsideAction = (isMenuOpen, menuRef, closeMenu) => {
	useEffect(() => {
		if (!isMenuOpen) return undefined

		const closeIfClickIsOutside = (event) => {
			if (!menuRef.current?.contains(event.target)) closeMenu()
		}
		const closeOnEscape = (event) => {
			if (event.key === 'Escape') closeMenu()
		}
		document.addEventListener('mousedown', closeIfClickIsOutside)
		document.addEventListener('keydown', closeOnEscape)

		return () => {
			document.removeEventListener('mousedown', closeIfClickIsOutside)
			document.removeEventListener('keydown', closeOnEscape)
		}
	}, [isMenuOpen, menuRef, closeMenu])
}

export const ShareButton = ({ tweetId }) => {
	const { currentUser } = useAuth()
	const { showToast } = useToast()
	const viewerId = currentUser?.id ?? null
	const menuRef = useRef(null)
	const [summary, setSummary] = useState(emptySummary)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const closeMenu = useCallback(() => setIsMenuOpen(false), [])
	const repostsVersion = useDataVersion(WATCHED_KINDS)

	useCloseMenuOnOutsideAction(isMenuOpen, menuRef, closeMenu)

	useEffect(() => {
		let isActive = true
		const updateIfActive = (loadedSummary) => {
			if (isActive) setSummary(loadedSummary)
		}

		getRepostSummary(tweetId, viewerId)
			.then(updateIfActive)
			.catch((loadError) => console.error('Error loading reposts:', loadError))

		return () => {
			isActive = false
		}
	}, [tweetId, viewerId, repostsVersion])

	const handleCopyLink = async () => {
		closeMenu()
		try {
			await navigator.clipboard.writeText(buildTweetUrl(tweetId))
			showToast('Enlace del tweet copiado.')
		} catch (copyError) {
			console.error('Error copying the link:', copyError)
			showToast('No se pudo copiar el enlace.', 'error')
		}
	}

	const handleToggleRepost = async () => {
		closeMenu()
		setIsSaving(true)
		try {
			if (summary.isRepostedByViewer) {
				await undoRepost(tweetId, viewerId)
				showToast('Quitaste tu repost.')
			} else {
				await repostTweet(tweetId, viewerId)
				showToast('Reposteaste este tweet.')
			}
			setSummary(buildNextSummary)
		} catch (repostError) {
			console.error('Error updating repost:', repostError)
			showToast('No se pudo actualizar el repost. Intenta de nuevo.', 'error')
		} finally {
			setIsSaving(false)
		}
	}

	const { repostCount, isRepostedByViewer } = summary
	const buttonClassName = isRepostedByViewer
		? 'tweet-action__button tweet-action__button--share tweet-action__button--reposted'
		: 'tweet-action__button tweet-action__button--share'

	return (
		<div className="tweet-action tweet-action--menu" ref={menuRef}>
			<button
				type="button"
				className={buttonClassName}
				onClick={() => setIsMenuOpen((wasOpen) => !wasOpen)}
				disabled={isSaving || !viewerId}
				aria-label="Compartir"
				aria-haspopup="menu"
				aria-expanded={isMenuOpen}
			>
				↗
			</button>
			{repostCount > 0 && (
				<span className="tweet-action__count tweet-action__count--static">
					{repostCount}
				</span>
			)}
			{isMenuOpen && (
				<div className="tweet-menu" role="menu">
					<button
						type="button"
						role="menuitem"
						className="tweet-menu__item"
						onClick={handleCopyLink}
					>
						Copiar enlace
					</button>
					<button
						type="button"
						role="menuitem"
						className="tweet-menu__item"
						onClick={handleToggleRepost}
					>
						{isRepostedByViewer ? 'Quitar repost' : 'Repostear'}
					</button>
				</div>
			)}
		</div>
	)
}