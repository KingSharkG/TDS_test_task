# Currency Converter

A React Native (Expo) app that converts amounts between currencies using live
rates from the [CurrencyBeacon](https://currencybeacon.com) API.

## Requirements

- Node.js 18+
- Yarn (the project uses `yarn@1.22.22`)
- Expo CLI (run via `npx`, no global install needed)
- For native builds: Xcode (iOS) and/or Android Studio

## Setup

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Create a `.env` file with your CurrencyBeacon credentials:

   ```bash
   EXPO_PUBLIC_CURRENCYBEACON_API_KEY=your_api_key
   EXPO_PUBLIC_CURRENCYBEACON_API_URL=https://api.currencybeacon.com/v1
   ```

   Get a free API key at <https://currencybeacon.com/register>
   (Dashboard > API Token Information).

## Running

```bash
yarn start      # start the Expo dev server
yarn ios        # build and run on iOS
yarn android    # build and run on Android
yarn web        # run in the browser
```
