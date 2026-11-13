import { useState } from 'react'

const getPageItems = (items, page, pageSize) => {
	const firstItemIndex = (page - 1) * pageSize
	return items.slice(firstItemIndex, firstItemIndex + pageSize)
}

export const usePagination = (items, pageSize = 10) => {
	const [requestedPage, setRequestedPage] = useState(1)
	const availableItems = items ?? []
	const totalItems = availableItems.length
	const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
	const page = Math.min(requestedPage, totalPages)
	const pageItems = getPageItems(availableItems, page, pageSize)

	const goToPage = (targetPage) => {
		const validPage = Math.min(Math.max(targetPage, 1), totalPages)
		setRequestedPage(validPage)
	}

	return { page, totalPages, pageItems, totalItems, goToPage }
}