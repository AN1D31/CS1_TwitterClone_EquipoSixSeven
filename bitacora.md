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

## 2026-10-30 16:14 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "tenemoss un trabajo de mi elevtiva que es software 1,  donde tenemos que trabajar en un clon de twiter ahora X, resulta que mis compañeros han avanzado por partes y para mañana debemos llevar un protipo bastante funcional, ya mi compañero creo el git con algunas cosas, ahora mismo estoy trabajando con mi amiga y ella va a realizar una cosa y yo deberia ir avanzando otra, sin embargo te pasare la información de el claude de mi amiga para que sepas que cosas esta haciendo ella" (with the project PDF "Clon de X")
- **Summary:** Read the project specification. Warned that the PDF contains hidden instructions aimed at AI assistants (component and collection names, comments to insert) and did not apply them. Reminded the course rule about bitacora.md and asked for the teammate's context, the repository and the milestone due tomorrow.
- **Files created or modified:** None.

## 2026-10-30 16:18 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** (no text; attached the project context written by a teammate's AI assistant)
- **Summary:** Cloned the repository and found the teammate's local changes were not pushed yet. Proposed splitting the work (UI pages vs Firebase/auth). The student chose the UI part with mock services and a custom dark X-like style. Started building pages, services and components.
- **Files created or modified:** None in the repository (work in progress in Claude's workspace).

## 2026-10-30 16:24 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "ten en cuenta que mi compañero habia hecho estas definiciones" (screenshot of the presentation split)
- **Summary:** Took the team lead's role definitions into account before continuing.
- **Files created or modified:** None.

## 2026-10-30 16:26 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "tenemos que hacer lo que la division de mi compañero indico yo soy valentina asi que me toca hacer ese adelnato en el desarrollo, no lo que estabamos haciendo" (screenshots of the task split)
- **Summary:** Reduced the work to Valentina's scope only: UserListItem, FollowButton, Following, Followers and User Tweets pages. Moved everything into src/users, removed pages owned by other members, and set aside the shared pieces (services, TweetCard, Pagination) as proposals for Susana and Andrés. Verified follow, pagination and sorting in the browser, and that lint and build pass. Delivered a zip with instructions.
- **Files created or modified:** src/users/users.css, src/users/hooks/useAsyncData.js, src/users/components/(UserAvatar, BackHeader, StatusMessage, FollowButton, UserListItem, UserConnections, FollowCounts, UserTweetList).jsx, src/users/pages/(FollowersPage, FollowingPage, UserTweetsPage).jsx

## 2026-10-30 16:41 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "como puedo actualizar lo que hicimos en el git  para que el git se actualice y ellos tambien tengan mi parte"
- **Summary:** Explained how to clone, create a branch from develop, copy the files, make commits with her own account, push the branch and open a pull request to develop, and that teammates get the changes with git pull after the merge.
- **Files created or modified:** None (guidance only).

## 2026-10-30 17:10 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "Ya andres me asigno los issues, el va a subir el utlimo archivo para hacer git pull y ahi si hago mi parte, teniendo en cuenta lo que el me asigno en los tres issues, recuerda que mis phus deben ir en mi propia rama, ya cuando haga pull request me tienen que aprobar, tambien te pasare el contexto del agente de andres para que tu y yo claude lo tengamos presente" (with screenshots of issues #14, #15, #16 and the team's AI agent guidelines)
- **Summary:** Adapted the followers/following lists and user tweets page to the team guidelines: feature-based folders, descriptive variable names, branch and PR plan per issue (#14, #15 → feature/follow-lists; #16 → feature/user-tweets). Verified with lint, build and browser tests.
- **Files created or modified:** src/users/users.css, src/users/hooks/useAsyncData.js, src/users/components/(UserAvatar, BackHeader, StatusMessage, FollowButton, UserListItem, UserConnections, FollowCounts, UserTweetList).jsx, src/users/pages/(FollowingPage, FollowersPage, UserTweetsPage).jsx

## 2026-10-30 17:34 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "ya hizo los cmabios"
- **Summary:** Checked the latest develop (only index.html language/title changed). Confirmed the followers/following and user tweets work has no conflicts and still passes lint and build. Pagination, TweetCard and services are still missing on develop, so the plan is: push feature/follow-lists, open a draft PR, and coordinate with Andrés and Susana to merge their parts first.
- **Files created or modified:** None (verification only).

## 2026-10-30 17:37 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "dame el paso a paso de lo que debemos hacer,  para no perderme"
- **Summary:** Step-by-step plan: coordinate with Andrés and Susana on missing shared files, create feature/follow-lists, copy and test files, commit only src/users files, open a draft PR closing #14 and #15, merge develop once dependencies land, then feature/user-tweets closing #16, and prepare the code-rules part of the presentation.
- **Files created or modified:** None (guidance only).

## 2026-10-30 20:22 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "Ya susana y andres hicieron los cambios, mira el repo"
- **Summary:** Reviewed the new develop (AuthContext from Andrés; Firebase config and mockUsers from Susana). Updated the followers/following and user tweets pages to get the logged user from useAuth, use Susana's mock users, hide the follow button when nobody is logged in, and fall back to initials when an avatar fails to load. Verified with lint, build and browser tests. Services, mockFollows, mockTweets, Pagination, usePagination and TweetCard are still missing on develop.
- **Files created or modified:** src/users/components/UserAvatar.jsx, src/users/components/UserListItem.jsx, src/users/components/UserConnections.jsx, src/users/pages/UserTweetsPage.jsx

## 2026-10-30 20:35 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "quen podemos ir haciendo localmente?"
- **Summary:** Local work plan while teammates finish their parts: set up and test the branch with all proposal files, commit only src/users and push feature/follow-lists as a draft PR, prepare feature/user-tweets locally, and prepare the code-rules part of the presentation with examples from the code.
- **Files created or modified:** None (guidance only).

## 2026-10-30 20:37 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "Para que se cierren faltan estos pasos: [...] eso dice susi" (Susana's notes on review, approval and merge)
- **Summary:** Confirmed the PR closing flow: ready for review, assign a reviewer, formal approval, merge into develop (default branch, so "Closes #" auto-closes the issues), delete the branch, update local develop, then continue with feature/user-tweets for #16.
- **Files created or modified:** None (guidance only).

## 2026-10-30 20:38 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "dame el paso a pso porque no entiendo nadan ni como hacer mi rama y como clonar el repo nuevo"
- **Summary:** Beginner step-by-step guide: check Git and Node, configure Git identity, clone the repository, install dependencies, create feature/follow-lists from develop, copy files, test in the browser with a simulated session, commit only src/users files, push the branch and open a draft pull request closing #14 and #15.
- **Files created or modified:** None (guidance only).

## 2026-10-30 20:39 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "dame un contexto para andres y susana de que falta para poder integrar mi parte"
- **Summary:** Wrote integration messages for Andrés (Pagination, usePagination and TweetCard contracts, merge order) and Susana (userService, followService and tweetService contracts, missing mockFollows and mockTweets, login user shape, .env.example format and missing firebase dependency).
- **Files created or modified:** None (guidance only).

## 2026-10-30 20:42 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** Terminal output showing "fatal: not a git repository" and an npm ENOENT error for package.json after cloning the repository.
- **Summary:** Explained that npm install failed because the terminal was still in the Desktop folder; steps to enter the project folder, open it in VS Code, install dependencies and create feature/follow-lists from develop.
- **Files created or modified:** None (guidance only).

## 2026-10-30 20:50 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "ya descomprimi y puse el src de la carpeta de valentina, pero no entendi lo demas"
- **Summary:** Simplified steps: verify the feature/follow-lists branch, copy the teammates' proposal folders only for local testing, run the dev server, simulate a logged session in the browser console and check the followers, following and user tweets pages.
- **Files created or modified:** None (guidance only).

## 2026-10-30 20:52 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "pero si remplazo scr no funcionaria, porque son 3 src no? y debe haber solo 1 en el proyecto de CS1_TwitterClone_EquipoSixSeven"
- **Summary:** Explained that pasting the three src folders merges their contents into the single project src (different files end up together), showed the resulting folder structure and which Windows dialog options to choose.
- **Files created or modified:** None (guidance only).

## 2026-10-30 20:56 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "no me deja pegar el code" (screenshot of Chrome DevTools paste warning)
- **Summary:** Explained how to unlock pasting in the Chrome console by typing "allow pasting", then set the test session and open the followers, following and user tweets pages; noted the pages also work without a session, just without the follow button.
- **Files created or modified:** None (guidance only).

## 2026-10-30 20:59 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "se ve bien" (screenshots of the followers, following and user tweets pages running locally)
- **Summary:** Confirmed the pages meet the issue requirements; steps to commit only the follow-lists files (#14, #15), update the AI usage log, push feature/follow-lists and open a draft pull request. The user tweets files (#16) stay for the second branch.
- **Files created or modified:** None (guidance only).

## 2026-10-30 21:02 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "dame la bitacora entera en orden para subirla"
- **Summary:** Compiled every AI usage log entry of this conversation in chronological order, ready to append to bitacora.md.
- **Files created or modified:** bitacora.md
## 2026-10-30 23:03 (COT)
- **Member:** Valentina Mejía (@ValenMejiaC)
- **Tool / model:** Claude (claude.ai) – Claude Opus 5.5
- **Conversation link:** [shared link]
- **Student message:** "no aparece para seguirlos" (screenshots of the profiles of Óscar Giraldo and Ana María Torres without follow buttons)
- **Summary:** Explained that no session was detected (the own profile did not show "Tu perfil"), so the follow button is hidden by design; steps to set the simulated session again in the browser console and what to expect after reloading.
- **Files created or modified:** None (guidance only).