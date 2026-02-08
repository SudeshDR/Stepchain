# Stepchain

Minimalist React Native app concept for earning coins based on walking, connecting to a Sepolia test wallet, and syncing to Firebase.

## Features
- Email/password login and registration (Firebase Auth)
- Step tracking via Expo Pedometer
- Coin calculation based on steps
- Sepolia wallet balance check via JSON-RPC
- Firebase Firestore sync for step data

## Setup
1. Install dependencies: `npm install`
2. Create an `.env` file with Expo public variables:

```
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
EXPO_PUBLIC_SEPOLIA_RPC_URL=...
```

3. Run the app:

```
npm run start
```

## Notes
- The Sepolia RPC defaults to `https://rpc.sepolia.org` if not set.
- This is a minimalist starter; add secure wallet connection or on-chain minting as needed.
