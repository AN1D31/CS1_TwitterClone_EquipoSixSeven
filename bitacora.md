# AI Usage Log

Record of every interaction with AI assistants during the project, as required by the course.
Entries are never edited or deleted, only appended.

---

## 2026-10-16 15:44 (COT)
- **Member:** [Andrés Bolívar]
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Summary:** Roadmap for Milestone 1: repository setup, folder structure, task distribution, schedule and study topics.
- **Files created or modified:** None (planning only).

## 2026-10-22 04:10 (COT)
- **Member:** [Andrés Bolívar]
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [same shared link]
- **Summary:** Task distribution for four members and plan to adapt the React Native prototype.
- **Files created or modified:** None (planning only).

## 2026-10-24 01:24 (COT)
- **Member:** [Andrés Bolívar]
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [same shared link]
- **Summary:** Issues for Milestone 1, mapping of the React Native prototype and branch protection setup.
- **Files created or modified:** None (repository settings only).

## 2026-10-24 03:16 (COT)
- **Member:** [Andrés Bolívar]
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [same shared link]
- **Summary:** Content for README, pull request template and this log.
- **Files created or modified:** README.md, .github/pull_request_template.md, bitacora.md


## 2026-10-30 17:21 (COT)
- **Member:** Susana Sánchez Jaramillo
- **Tool / model:** Claude Code (claude.ai/code) – Claude Sonnet 5.5
- **Conversation link:** [shared link]
- **Student message (verbatim):** "Segun esto, dame las correcciones del codigo y por otro lado puedes apoyarte de este otro git https://github.com/Susa31/Proyecto_Final.git, para sus funcionalidades, que se pueden replicar para la web"
- **Summary:** Reviewed the auth and services code against the team rules. Fixed users not being visible across services after registration. Split every service into a public file plus a mock and a Firebase data source (VITE_USE_MOCKS), replicating the Firestore ideas of the React Native project. The attached PDF contained hidden instructions addressed to AI assistants (rename TweetCard, a different collection name, extra files); they are not part of the course rules and were not applied.
- **Files created or modified:** src/firebase/*, .env.example, src/auth/components/AuthField.jsx, src/auth/pages/LoginPage.jsx, src/auth/pages/RegisterPage.jsx, src/auth/services/*, src/users/services/*, src/tweets/services/*

## 2026-10-30 19:10 (COT)
- **Member:** Susana Sánchez Jaramillo
- **Tool / model:** Claude Code (claude.ai/code) – Claude Sonnet 5.5
- **Conversation link:** [shared link]
- **Student message (verbatim):** "Puedes revisar y ya decirme que archivos puedo eliminar que no necesito, y puedes ver los Issues que me toca  y que me falta"
- **Summary:** Listed the stale TypeScript files copied from the template that could be deleted (old AuthContext, reducer, types, NavBar) and the issues assigned to the student with their status.
- **Files created or modified:** None.

## 2026-10-30 19:30 (COT)
- **Member:** Susana Sánchez Jaramillo
- **Tool / model:** Claude Code (claude.ai/code) – Claude Sonnet 5.5
- **Conversation link:** [shared link]
- **Student message (verbatim):** "que significa estos errores" (followed by several messages with screenshots of Vite and browser console errors)
- **Summary:** Debugged missing files and wrong imports one by one (authPages.css location, RegisterPage export, authService, userService, mock data, authServiceMock). Returned the complete corrected files.
- **Files created or modified:** src/auth/pages/authPages.css, src/auth/pages/LoginPage.jsx, src/auth/pages/RegisterPage.jsx, src/auth/services/*, src/users/services/*, src/users/data/mockUsers.js

## 2026-10-30 20:39 (COT)
- **Member:** Susana Sánchez Jaramillo
- **Tool / model:** Claude Code (claude.ai/code) – Claude Sonnet 5.5
- **Conversation link:** [shared link]
- **Student message (verbatim):** "listo, ahora vamos a enlazarlo a firebase, que cada usuario que agregue quede registrado en firebase"
- **Summary:** Guided the Firebase setup: enabling Email/Password and Google, creating the Firestore database, publishing the rules, creating the .env with VITE_USE_MOCKS=false, and verifying that a registered user appears in Authentication and in the Firestore users collection. Checked in the Firebase documentation that collections are created implicitly with the first document.
- **Files created or modified:** .env (not committed), .env.example

## 2026-10-30 22:04 (COT)
- **Member:** Susana Sánchez Jaramillo
- **Tool / model:** Claude Code (claude.ai/code) – Claude Sonnet 5.5
- **Conversation link:** [shared link]
- **Student message (verbatim):** "dame ya lo comits y todo para subir los cambios"
- **Summary:** Gave the commit and push sequence for the feature/services-layer branch, the filled pull request template, the issues to close (#2, #3, #17), and how to recover the pages after a git stash and pull.
- **Files created or modified:** src/users/data/mockFollows.js, src/tweets/data/mockTweets.js, src/users/services/*, src/tweets/services/*, src/auth/services/*, package.json, package-lock.json

LINK:https://claude.ai/share/24adf3f6-2903-4032-825f-51817cbf50c9