// Shows loading, empty, error or success states in a consistent way.
export const StatusMessage = ({ type = 'info', children }) => {
	const role = type === 'error' ? 'alert' : 'status'
	return (
		<p className={`user-status user-status--${type}`} role={role}>
			{children}
		</p>
	)
}

export const Loader = () => (
	<div className="user-loader" role="status" aria-label="Cargando">
		<span className="user-loader__spinner" />
	</div>
)
