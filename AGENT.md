# AGENT.md — Kora Messenger Changelog

This file tracks all AI-assisted work on Kora Messenger.
Any AI continuing this project MUST read this file first.

## Project Rules

1. Never use subagents.
2. Never babysit builds.
3. Maintain this AGENT.md changelog so any AI can continue the project.
4. Always log problems and fixes found here.
5. Tag entries with date, time, SHA, timezone (Africa/Lagos, UTC+1).
6. Mark every state: ✅ DONE, ❌ FAILED, 🔶 PENDING, 🚧 IN PROGRESS.
7. User sends plans to follow.
8. GitHub token is saved as $GITHUB_TOKEN.

## Repository

- **GitHub**: https://github.com/24Bada/kora-messenger
- **Owner**: 24Bada (Ijezie Goodluck)
- **Branch**: main

## Tech Stack

- **Frontend**: React Native (Expo SDK 54), React Navigation v7, Socket.IO Client
- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.IO, JWT, bcrypt
- **Design**: Kora design system (custom colors, typography, spacing, layout)

## Development Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Project setup & scaffold | ✅ DONE |
| 2 | Kora design system | ✅ DONE |
| 3 | Navigation structure | ✅ DONE |
| 4 | Local server (Express) | ✅ DONE |
| 5 | Database models (MongoDB) | ✅ DONE |
| 6 | Authentication (register/login/OTP) | ✅ DONE |
| 7 | Profiles | 🔶 PENDING |
| 8 | Messaging (core) | 🚧 IN PROGRESS |
| 9 | Media (camera/gallery/documents) | 🔶 PENDING |
| 10 | Voice messages & audio | 🔶 PENDING |
| 11 | Translation architecture | 🔶 PENDING |
| 12 | Status | 🔶 PENDING |
| 13 | Channels | 🔶 PENDING |
| 14 | Kora AI assistant | 🔶 PENDING |
| 15 | Premium | 🔶 PENDING |
| 16 | Business | 🔶 PENDING |
| 17 | Privacy/Security | 🔶 PENDING |
| 18 | Legal/help pages | 🔶 PENDING |
| 19 | Testing | 🔶 PENDING |
| 20 | Production build | 🔶 PENDING |

---

## Changelog

### 2026-08-15 17:46 WAT — Initial Project Scaffold

**SHA:** (initial commit)
**Phase:** 1-6 (setup through auth architecture)
**Status:** ✅ DONE

**What was done:**
- Extracted and inspected old KoraMessengerMobile project (228 files, Expo SDK 54)
  - Used as reference only — not inheriting broken config
  - Old project used deprecated expo-av alongside expo-audio
  - Old project had hardcoded Cloudflare tunnel URL in api/api.js
- Created new clean Kora Messenger project structure
- Built Kora design system:
  - `theme/colors.js` — Light/dark palettes, brand colors, badge colors, semantic colors
  - `theme/typography.js` — Font sizes, weights, line heights, precomposed styles
  - `theme/layout.js` — Spacing scale, border radius, shadows, z-index, avatar/icon/button sizes
  - `theme/index.js` — Theme provider with `useTheme()` and `useCustomTheme()` hooks
- Created frontend core:
  - `config/config.js` — Centralized API_BASE_URL, feature flags, endpoints
  - `services/api.js` — Fetch-based API client with auth injection (auth, user, conversation, message, status, channel, premium APIs)
  - `services/socket.js` — Socket.IO client with connect/disconnect/event helpers
  - `context/AuthContext.js` — Auth state management (login, logout, updateUser, AsyncStorage persistence)
  - `context/ThemeContext.js` — Theme mode (light/dark/system) with AsyncStorage persistence
  - `navigation/AppNavigator.js` — Auth stack vs Main stack, conditional rendering based on auth state
  - `constants/messageStatus.js` — Message status, types, delivery status constants
  - `utils/dateUtils.js` — Dynamic date formatting (chat times, separators, last seen, message grouping)
- Created screens:
  - `screens/auth/WelcomeScreen.js` — Brand intro, get started, login/register links, legal footer
  - `screens/auth/LoginScreen.js` — Email/password login, Google/Apple "coming soon" states, validation
  - `screens/auth/RegisterScreen.js` — Full name, username, email, phone, password with validation
  - `screens/HomeScreen.js` — Chat list with avatars, unread badges, timestamps, FAB, pull-to-refresh, empty state
- Built backend server:
  - `server/server.js` — Express + Socket.IO entry point with all route mounting
  - `server/config/index.js` — All env vars centralized (never access process.env elsewhere)
  - `server/config/db.js` — MongoDB connection with error handling
  - Models: User, Conversation, Message, VerificationCode, Status, Channel, Subscription, Business, Notification, Block, Report
  - Controllers: auth, otp, user, conversation, message, status, channel, premium, business, media
  - Routes: auth, otp, users, conversations, messages, status, channels, premium, business, media
  - Middleware: auth (JWT verification), errorHandler, requestLogger, rateLimiter
  - Services: emailService (Nodemailer, dev fallback to console.log)
  - Utils: otp generator (crypto-based 6-digit)
  - Sockets: Socket.IO setup with auth, presence, typing, message delivery, read receipts
- Created project config:
  - `.gitignore` — node_modules, .expo, .env, build artifacts, old_project_ref
  - `README.md` — Project overview, structure, dev instructions
  - `server/.env.example` — All env vars documented

**Key decisions:**
- Used `expo-audio` (not deprecated `expo-av`) for audio
- API_BASE_URL defaults to `http://10.0.2.2:5000` (Android emulator → host localhost)
- Premium controller does NOT fake payments — returns 503 until Stripe is configured
- Google/Apple auth buttons show "coming soon" alerts — no fake authentication
- Translation endpoints exist but don't fake translations
- All env vars centralized in server/config/index.js and frontend/config/config.js
- MongoDB connection string defaults to local: mongodb://127.0.0.1:27017/kora_messenger

**Old project reference notes:**
- Kora color scheme was blue (#2563EB) primary, violet (#7C3AED) secondary — preserved this identity
- Had Kora AI avatar, Kora Support avatar, premium/official badges — to be migrated as assets
- Had camera components (KoraCameraView, KoraGalleryStrip, etc.) — architecture to reference for Phase 9
- Had voice translation preview screen — architecture to reference for Phase 10-11
- Had chat components (MessageBubble, ChatInput, AttachmentSheet, VoiceRecorder) — to reference for Phase 8

---

## Next Steps (Roadmap for Continuing AI)

1. **Phase 7 — Profiles**: Create EditProfileScreen, SettingsScreen, AccountScreen, QRCodeScreen
2. **Phase 8 — Messaging**: Create ChatScreen with real-time messaging, MessageBubble, ChatInput, message persistence
3. **Phase 9 — Media**: Create camera, gallery, document picker, media preview screens
4. **Phase 10 — Voice**: Voice recording UI with expo-audio, playback, recording bar
5. **Phase 11 — Translation**: Translation API architecture (no fake translations)
6. **Phase 12 — Status**: Status creation, viewing, privacy controls
7. **Phase 13 — Channels**: Channel creation, posting, following, admin management
8. **Phase 14 — Kora AI**: AI assistant account and chat
9. **Phase 15 — Premium**: Premium UI, plan display, subscription architecture (no fake payments)
10. **Phase 16 — Business**: Business profiles, catalog, advertising architecture
11. **Phase 17 — Privacy/Security**: App lock, privacy settings, blocking
12. **Phase 18 — Legal pages**: Terms, Privacy, Guidelines, Help (clickable with placeholder content)
13. **Phase 19 — Testing**: Test all features
14. **Phase 20 — Production build**: EAS build configuration

**IMPORTANT**: The old project zip is in `incoming_files/65879d32b_KoraMessengerMobile-AI.zip`. Any AI continuing should extract and reference it for component architecture, but NOT inherit its broken configuration.

---

## Problems & Fixes Log

(Empty — no issues encountered yet during initial scaffold)
