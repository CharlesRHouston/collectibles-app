# Collectibles App

## Description

Real-world collectibles of places ⛰️, plants 🌷, animals 🦁, and food 🍷.
Get out into the world, collect them all, increase your high score!

## Features

- 📲 Create account
- 🚠 View collectibles
- 💯 Track your high score 
- 📸 Upload image and text
- 👨‍🔧 Change username & password

## Screenshots

View collections:

![View Collections Demo](./gifs/viewCollections.gif)

Add a collectible:

![View Collections Demo](./gifs/addCollectible.gif)

Change username:

![View Collections Demo](./gifs/changeUsername.gif)

## Dependencies

- AWS CLI 
- CDK CLI 
- Expo

## Deployment

### Deploy Backend to AWS App Runner

```bash
# Navigate to the infrastructure project
cd Collectibles.Infrastructure

# Build the CDK project
dotnet build src/Collectibles.Infrastructure.Stack/Collectibles.Infrastructure.Stack.csproj -c Release

# Bootstrap (only needed on initial deployment)
cdk bootstrap

# Deploy the CDK stack
cdk deploy

# Destroy the CDK stack
cdk destroy
```

### Run Frontend In Expo

```bash
# Navigate to the frontend project
cd Collectibles.Frontend/collectibles/

# Copy your CDK stack's BASE URL output to the environment variable in your .env file:
EXPO_PUBLIC_BASE_URL=<copied base URL>

# Start the Expo development server
npx expo start --localhost
```


