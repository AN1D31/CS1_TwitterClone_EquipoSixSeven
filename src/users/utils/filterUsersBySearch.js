// Lowercase and without accents, so "alvarez" also finds "Álvarez".
const simplifyText = (text) =>
	text
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()

// Users whose full name or username contains the searched text.
export const filterUsersBySearch = (users, searchText) => {
	const simplifiedSearch = simplifyText(searchText.trim().replace(/^@/, ''))
	if (!simplifiedSearch) return []

	return users.filter((user) => simplifyText(`${user.fullName} ${user.username}`).includes(simplifiedSearch))
}
