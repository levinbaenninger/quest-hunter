# Quest Hunter

A mobile app for creating and participating in quests.

> **Note:** This app does not work in Expo Go. A development build is required.

## Tech Stack

- **[Expo](https://expo.dev/) / Expo Router** — file-based navigation and native build tooling
- **[Convex](https://convex.dev/)** — real-time backend and database
- **[Clerk](https://clerk.com/)** — authentication
- **[NativeWind](https://www.nativewind.dev/)** — Tailwind CSS for React Native

## Prerequisites

- [Node.js](https://nodejs.org/) >= 24.14.0
- [Bun](https://bun.sh/) 1.3.9
- Xcode (iOS) or Android Studio (Android)

## Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable                            | Description                                               |
| ----------------------------------- | --------------------------------------------------------- |
| `CONVEX_DEPLOYMENT`                 | Your Convex deployment name (e.g. `dev:your-project-123`) |
| `EXPO_PUBLIC_CONVEX_URL`            | Convex deployment URL from the Convex dashboard           |
| `EXPO_PUBLIC_CONVEX_SITE_URL`       | Convex site URL (used for HTTP actions)                   |
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key from the Clerk dashboard            |
| `CLERK_JWT_ISSUER_DOMAIN`           | Clerk JWT issuer domain (used in Convex auth config)      |
| `CLERK_WEBHOOK_SECRET`              | Clerk webhook signing secret for user sync                |

### 3. Link Convex

On first setup, link the project to a Convex deployment:

```bash
bunx convex dev
```

This authenticates with Convex, creates or links a deployment, and pushes the schema and functions. You only need to do this once — after that `bun dev` handles it.

## Development

> **Recommended: Android Simulator** — The camera feature is not available on the iOS simulator. Use the Android emulator for the full experience.

### Build and install the dev client

**Android (recommended):**

```bash
bun run android
```

**iOS:**

```bash
bun run ios
```

### Start the development server

```bash
bun dev
```

This starts both the Metro bundler and the Convex backend concurrently.

To start services individually:

```bash
bun start           # Metro bundler only
bun convex:dev      # Convex backend only
```

## Code Quality

```bash
bun run typecheck   # TypeScript type checking
bun run lint        # ESLint
bun run lint:fix    # ESLint with auto-fix
bun run format      # Prettier check
bun run format:fix  # Prettier auto-format
```

## Commit Conventions

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) via commitlint. All commit messages must follow the format:

```
type(scope): message
```

Common types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`

Examples:

```
feat(quests): add difficulty filter to quest list
fix(auth): handle expired Clerk session token
chore: update dependencies
```
