# College Portal — Complete Architecture Plan

## Tech Stack
- **Frontend**: React 19 + Vite + Tailwind CSS v4 + Socket.io-client + Fabric.js
- **Backend**: Node.js + Express + Mongoose + Socket.io + JWT + bcryptjs
- **Database**: MongoDB

---

## Project Structure

### Server (`server/`)

```
server/
├── package.json
├── server.js                    ← Express + HTTP + Socket.io setup
├── seed.js
├── .env
├── middleware/
│   ├── auth.js                  ← JWT verify
│   └── rbac.js                  ← role-based access (club president, admin)
├── models/
│   ├── User.js                  ← admin/auth users
│   ├── Student.js               ← + titles[], resumeData
│   ├── Faculty.js
│   ├── Event.js
│   ├── EventPoll.js             ← poll options, votes, createdBy
│   ├── AcademicTopper.js
│   ├── ClubLeader.js            ← tier enum: Core/CR/ASC/SOH
│   ├── Club.js                  ← name, description, presidentId, members[], images[]
│   ├── Title.js                 ← name, icon, description, criteria
│   ├── StudentTitle.js          ← studentId, titleId, earnedDate
│   ├── Message.js               ← sender, receiver, content, timestamp, read
│   ├── ChatRoom.js              ← name, type (public/private), members[]
│   ├── LeaderboardEntry.js      ← studentId, category (coding/sports/ps), score
│   ├── Book.js                  ← title, author, cover, description, suggestedBy
│   └── Suggestion.js            ← category (project/career), title, link, content
├── routes/
│   ├── auth.js
│   ├── students.js
│   ├── faculty.js
│   ├── events.js
│   ├── governance.js
│   ├── clubs.js
│   ├── titles.js
│   ├── messages.js
│   ├── leaderboard.js
│   ├── books.js
│   └── suggestions.js
└── socket/
    └── chatHandler.js           ← Socket.io event handlers
```

### Client (`client/src/`)

```
client/src/
├── main.jsx
├── index.css                    ← Tailwind + theme + animations
├── App.jsx                      ← tab state manager, auth context
├── context/
│   ├── AuthContext.jsx          ← auth state, login/logout
│   └── SocketContext.jsx        ← socket.io connection
├── api/
│   └── index.js                 ← centralized fetch calls
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx  ← guards pages behind login
│   │   └── Footer.jsx
│   ├── directory/
│   │   ├── DirectoryPage.jsx
│   │   ├── StudentGrid.jsx
│   │   └── ProjectCard.jsx     ← GitHub/LinkedIn/Portfolio icons, Leapx badge, title icons
│   ├── faculty/
│   │   └── FacultyPage.jsx
│   ├── campus/
│   │   ├── CampusLife.jsx
│   │   └── EventMemories.jsx   ← masonry grid + lightbox
│   ├── governance/
│   │   └── GovernancePage.jsx
│   ├── clubs/
│   │   ├── ClubPage.jsx        ← reusable per-club page
│   │   ├── ClubGallery.jsx     ← slideshow with image viewer
│   │   ├── ClubImageEditor.jsx ← Fabric.js canvas editor
│   │   └── ClubDirectory.jsx   ← list of all 7 clubs
│   ├── titles/
│   │   ├── TitlesPage.jsx      ← browse all titles
│   │   ├── TitleBadge.jsx      ← badge icon component
│   │   └── StudentTitles.jsx   ← display on profile cards
│   ├── leaderboard/
│   │   ├── LeaderboardPage.jsx
│   │   └── LeaderboardTable.jsx
│   ├── messaging/
│   │   ├── MessagingPage.jsx   ← DMs + chatrooms
│   │   ├── ChatWindow.jsx
│   │   ├── PublicChatRoom.jsx
│   │   └── ContactList.jsx
│   ├── events/
│   │   ├── EventPoll.jsx
│   │   └── EventInvitation.jsx
│   ├── resume/
│   │   └── ResumeBuilder.jsx
│   └── resources/
│       ├── BookSuggestions.jsx
│       └── PracticalResources.jsx   ← project ideas + career prep
```

---

## 9-Phase Implementation Plan

### Phase 1: Foundation & Backend Models (~20 files)
- Initialize `server/` with Express + Mongoose + Socket.io
- Write all 13 Mongoose models
- JWT auth middleware + RBAC middleware
- All REST API route files
- `seed.js` with comprehensive mock data
- Socket.io chat handler scaffold
- Root `package.json` with `concurrently` for dev script

### Phase 2: Frontend Shell (~10 files)
- `npm create vite@latest` with React setup
- Tailwind CSS v4 configuration
- `App.jsx` with SPA tab state management
- `Navbar.jsx` with dark theme, monospace font, neon indicators
- `AuthContext.jsx` + `ProtectedRoute.jsx` for login flow

### Phase 3: Core Pages — Directory, Faculty, Campus (~8 files)
- `DirectoryPage.jsx` — fetches students, filter bar
- `StudentGrid.jsx` — responsive grid layout
- `ProjectCard.jsx` — full card with Leapx badge, titles, social links
- `FacultyPage.jsx` — faculty profiles
- `CampusLife.jsx` — countdown + event memories

### Phase 4: Governance & 7 Club Pages (~10 files)
- `GovernancePage.jsx` — leadership tiers
- `ClubDirectory.jsx` — list of 7 clubs
- `ClubPage.jsx` — per-club page
- `ClubGallery.jsx` — slideshow + lightbox
- `ClubImageEditor.jsx` — Fabric.js canvas editor

### Phase 5: Titles & Leaderboards (~7 files)
- Titles CRUD + frontend pages
- Leaderboard backend + frontend

### Phase 6: Messaging System (~8 files)
- Socket.io DMs + public chatrooms
- Event polls + invitations

### Phase 7: Resume Builder (~3 files)
- Multi-step form + live preview + print styles

### Phase 8: Resources (~6 files)
- BookSuggestions + PracticalResources

### Phase 9: Premium UI Polish (~3 files)
- Animations, transitions, neon effects, micro-interactions
