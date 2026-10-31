export const AuthField = ({ id, label, name, type, autoComplete, value, onChange }) => {
	return (
		<div className="auth-field">
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				name={name}
				type={type}
				autoComplete={autoComplete}
				value={value}
				onChange={onChange}
				required
			/>
		</div>
	)
}