# Kora Messenger

A modern communication platform — messaging, voice, video, translation, AI, social features, channels, premium subscriptions, business tools, and privacy.

Built with React Native (Expo) + Node.js/Express/MongoDB/Socket.IO.

## Project Structure

```
kora-messenger/
├── frontend/          # React Native (Expo) mobile app
│   ├── components/    # Reusable UI components
│   ├── config/        # Centralized configuration
│   ├── context/       # Auth & Theme contexts
│   ├── navigation/    # App navigator
│   ├── screens/       # Screen components
│   ├── services/      # API & Socket.IO clients
│   ├── theme/         # Kora design system
│   └── utils/         # Utilities
├── server/            # Node.js backend
│   ├── config/        # Server configuration
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Auth, error handling, rate limiting
│   ├── models/        # Mongoose models
│   ├── routes/        # Express routes
│   ├── services/      # Email & external services
│   ├── sockets/       # Socket.IO real-time
│   └── utils/         # Utilities
└── AGENT.md           # AI changelog & roadmap
```

## Development

### Frontend
```bash
cd frontend
npm install
npx expo start
```

### Backend
```bash
cd server
cp .env.example .env  # Fill in values
npm install
npm run dev
```

## Design System

Kora has its own identity — not a WhatsApp clone.
- Primary: Blue (#2563EB)
- Secondary: Violet (#7C3AED)
- Supports light & dark mode
- Reusable components, spacing, typography scales

## Badges
- **Purple**: Official Kora account
- **Blue**: Kora Premium subscriber
- **Gold**: Kora Business account

## License
Proprietary — All rights reserved.
