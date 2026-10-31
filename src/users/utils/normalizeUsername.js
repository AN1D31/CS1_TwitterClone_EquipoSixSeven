// Usernames are stored in lowercase, so the one in the URL is normalized
// before searching (e.g. /users/Andres finds "andres").
export const normalizeUsername = (username) => username.trim().replace(/^@/, '').toLowerCase()
