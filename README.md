# Quest Hunter

A mobile app for creating and participating in quests.

> **Note:** This app does not work in Expo Go due to the use of Expo Maps. A development build is required.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 24.14.0
- [Bun](https://bun.sh/) 1.3.9
- Xcode (iOS) or Android Studio (Android)

## Getting Started

Install dependencies:

```bash
bun install
```

## Development

> **Recommended: Android Simulator** — The camera feature is not available on the iOS simulator. Use the Android emulator for the full experience.

### 1. Build and install the dev client

**Android (recommended):**

```bash
bun run android
```

**iOS Simulator:**

```bash
bun run ios
```

### 2. Start the development server

```bash
bun dev
```

This starts both the Metro bundler and the Convex backend concurrently. Open the installed dev client on your simulator and it will connect automatically.

To start services individually:

```bash
bun start           # Metro bundler only
bun convex:dev      # Convex backend only
```
