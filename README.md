# HostelFinder Nepal — React Native (Expo) App

This is a working implementation of your wireframe: Onboarding → Login → Home listing → Hostel Detail → Booking Details → Booking Confirmed.

## What's inside

```
HostelFinder/
├── App.js                       # Navigation setup (all 6 screens wired together)
├── app.json                     # Expo app config
├── package.json
├── babel.config.js
└── src/
    ├── theme/colors.js          # Color palette (purple/orange) — edit here to restyle everything
    ├── data/hostels.js          # Mock hostel data — swap for a real API later
    ├── components/
    │   ├── HostelCard.js        # Card used in the Home listing
    │   └── BottomNavBar.js      # Bottom tab bar (Home/Search/Bookings/Saved/Profile)
    └── screens/
        ├── OnboardingScreen.js
        ├── LoginScreen.js
        ├── HomeScreen.js
        ├── HostelDetailScreen.js
        ├── BookingDetailsScreen.js
        └── BookingConfirmedScreen.js
```

## 1. Install prerequisites (one-time)

1. **Node.js** (v18 or newer) — download from https://nodejs.org and install.
2. **VS Code** — https://code.visualstudio.com
3. **Expo Go app** on your phone — search "Expo Go" on the App Store / Play Store. This lets you preview the app live on your own phone without building anything native.

You do **not** need Android Studio or Xcode for this — Expo handles that.

## 2. Open the project in VS Code

1. Unzip the project folder you downloaded.
2. Open VS Code → `File > Open Folder` → select the `HostelFinder` folder.
3. Open a terminal inside VS Code: `Terminal > New Terminal`.

## 3. Install dependencies

In the VS Code terminal, run:

```bash
npm install
```

This installs React Native, Expo, React Navigation, and icon libraries listed in `package.json`.

## 4. Run the app

```bash
npx expo start
```

This opens a QR code in your terminal/browser.

- **On your phone:** open the Expo Go app and scan the QR code. The app loads live on your device.
- **On a simulator:** press `i` in the terminal for iOS simulator (Mac only) or `a` for Android emulator (requires Android Studio set up).
- **In a browser:** press `w` to preview in web (not all native features behave identically in web, but layout/navigation will work).

Any time you save a file, the app hot-reloads automatically.

## 5. Where to make changes

- **Colors/branding:** `src/theme/colors.js`
- **Hostel data:** `src/data/hostels.js` — replace this with a `fetch()` call to your backend when you have one (e.g. in `HomeScreen.js`, swap the imported `hostels` array for data loaded with `useEffect` + `fetch`)
- **Login logic:** `src/screens/LoginScreen.js` — `handleLogin()` currently just navigates to Home. Wire it to your auth API (Firebase Auth, your own backend, etc.) here.
- **Booking logic:** `src/screens/BookingDetailsScreen.js` — `handleConfirm()` currently just navigates forward. Connect this to a real booking API call when ready.

## Next steps you may want

- Add a **backend** (Node/Express, Firebase, or Supabase) to persist users, hostels, and bookings instead of the mock data.
- Add **form validation** on the Login screen.
- Add **image upload** for hostel owners if you build an owner-facing flow.
- Add **persisted login** using `expo-secure-store` so users stay logged in.

If you want help with any of these next steps, just ask.
