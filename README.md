# X Clone – Team SixSeven

A clone of the social network X (formerly Twitter), built as a Single Page Application with React.js and Firebase for the **Software Development Elective I** course.

Users will be able to register, log in, publish tweets, follow other users and see the tweets of the people they follow.

## Team

| Name | GitHub | Main responsibilities |
|---|---|---|
| Andrés Bolívar | [@AN1D31](https://github.com/AN1D31) | Team lead, architecture, routing, shared components, code review |
| Susana Sánchez | [@Susa31](https://github.com/Susa31) | Firebase, authentication, services layer |
| Valentina Mejía | [@ValenMejiaC](https://github.com/ValenMejiaC) | Followers, following and user profile pages |
| Yésica | [@Yesicaazul](https://github.com/Yesicaazul) | Home, compose tweet and feed pages |

## Tech stack

- **React.js** with **Vite**: user interface
- **React Router**: client-side routing
- **Firebase**: authentication and data storage
- **ESLint + Prettier**: code style
- **Git + GitHub**: version control and collaboration

## Getting started

### Prerequisites

- Node.js (LTS version)
- npm

### Installation

```bash
git clone https://github.com/AN1D31/CS1_TwitterClone_EquipoSixSeven.git
cd CS1_TwitterClone_EquipoSixSeven
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Previews the production build |
| `npm run lint` | Runs ESLint |

## Milestones

### Milestone 1 – SPA layout (due October 31, 2026)
- [ ] Register page
- [ ] Login page (username/password and Google sign-in)
- [ ] Home page with tweet link and counters
- [ ] Compose tweet page
- [ ] Following list (alphabetical, 10 per page)
- [ ] Followers list with follow button (alphabetical, 10 per page)
- [ ] User tweets page (newest first, 10 per page)
- [ ] Feed page (10 per page)
- [ ] Shared header (logo, username, logout)

### Milestone 2 – User features and tweets
Registration, login, publishing tweets with Firebase.

### Milestone 3 – Follow features and lists
Follow logic, followers and following lists with real data.

## Project structure

```
src/
  components/   Reusable UI components (Header, TweetCard, Pagination...)
  pages/        One component per route
  services/     Data access (mock data now, Firebase later)
  context/      Global state (authentication)
  hooks/        Custom hooks (usePagination...)
  data/         Mock data
  utils/        Helper functions
```

## Data model

```
user:   { id, fullName, username, email, avatarUrl, createdAt }
tweet:  { id, authorId, body, createdAt }
follow: { followerId, followingId, createdAt }
```

## Git workflow

### Branches

| Branch | Purpose |
|---|---|
| `main` | Stable releases only (one per milestone) |
| `develop` | Integration branch (default) |
| `feature/<name>` | New features, e.g. `feature/login-page` |
| `fix/<name>` | Bug fixes |
| `docs/<name>` | Documentation |

Both `main` and `develop` are protected: every change goes through a pull request with at least one approval from another team member.

### Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | Formatting, no logic changes |
| `refactor:` | Code changes without new features or fixes |
| `chore:` | Configuration, dependencies |

Example: `feat: add pagination to followers list`

### Workflow

1. Pick an issue assigned to you.
2. Update `develop` and create a branch: `git checkout -b feature/<name>`.
3. Commit small, clear changes.
4. Push and open a pull request to `develop`, writing `Closes #<issue>` in the description.
5. Request a review from a teammate and fix the comments.
6. Merge once approved.

## Code rules

- All code, comments and documentation in English (user-facing text may be in Spanish).
- camelCase for variables and functions, PascalCase for components.
- Only `let` and `const`.
- Maximum two nesting levels per function; extract a new function otherwise.
- Self-explanatory names (e.g. `sortUsersByFullNameAsc`, `lastEventDay`).
- SOLID principles: UI components never access data directly, they use services.

## AI usage

This team uses AI assistants during development. Every interaction is recorded in [`bitacora.md`](./bitacora.md), as required by the course.

## License

This project is licensed under the [MIT License](./LICENSE).

## Credits

Based on a previous React Native prototype by Susana Sánchez.