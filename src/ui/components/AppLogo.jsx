// Team logo: a 6 and a 7 drawn with one continuous line. It takes the text color of its parent.
export const AppLogo = ({ size = 32 }) => {
	return (
		<svg
			className="app-logo"
			width={size * 1.5}
			height={size}
			viewBox="0 0 48 32"
			fill="none"
			stroke="currentColor"
			strokeWidth="4"
			strokeLinecap="round"
			strokeLinejoin="round"
			role="img"
			aria-label="SixSeven"
		>
			<path d="M4 21a7 7 0 1 0 14 0a7 7 0 1 0-14 0C4 10 11 4 21 4H43L31 28" />
		</svg>
	)
}