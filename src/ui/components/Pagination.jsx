export const Pagination = ({ page, totalPages, onPageChange }) => {
	if (totalPages <= 1) {
		return null
	}

	return (
		<nav className="pagination" aria-label="Paginación">
			<button
				type="button"
				className="pagination__button"
				onClick={() => onPageChange(page - 1)}
				disabled={page === 1}
			>
				Anterior
			</button>
			<span className="pagination__status">
				Página {page} de {totalPages}
			</span>
			<button
				type="button"
				className="pagination__button"
				onClick={() => onPageChange(page + 1)}
				disabled={page === totalPages}
			>
				Siguiente
			</button>
		</nav>
	)
}