# 🎅 Secret Santa Generator 🎄

Make your holiday gift exchange easy and fun! This web app helps you organize Secret Santa by randomly assigning who gives gifts to whom. Everyone gets a special link that reveals only their own assignment, keeping the surprise intact.

Works in 9 languages and on any device - perfect for families, friend groups, and office parties!

## How It Works

1. Add everyone's names to your Secret Santa group
2. (Optional) Set up specific pairings if you want certain people matched together
3. Generate the assignments - everyone gives and receives one gift
4. Share the unique links - each person gets their own secret link
5. Open the link to see who you're buying for - the surprise is revealed!

## Usage Guide

### Step 1: Adding Participants

1. Enter a participant's name in the input field
2. Click "Add" or press Enter
3. Repeat for all participants (you need at least 3 people)

### Step 2: Creating Pre-assignments (Optional)

Want to make sure specific people are matched? You can set this up:

1. Go to the "Pre-assignments" section
2. Select who should give (from the first dropdown)
3. Select who they should give to (from the second dropdown)
4. Click "Add Pre-assignment"

The system will respect these pairings when creating the full assignment list.

### Step 3: Generating and Sharing Links

1. Click "Generate Secret Santa Assignments"
2. You'll get a unique encrypted link for each participant
3. Copy individual links or copy all at once
4. Send each person their own link via email, text, WhatsApp, etc.

**Important**: Make sure each person only gets their own link, not someone else's!

### Step 4: Revealing Assignments

When someone opens their link:
1. They'll see a festive page with their assignment
2. It shows who they're buying a gift for
3. That's it - the surprise is revealed instantly!

## Features

- ✅ Simple and intuitive - anyone can use it
- 🌍 Works in 9 languages (English, Czech, German, Polish, French, Spanish, Italian, Russian, Portuguese)
- 📱 Mobile-friendly - works on phones, tablets, and computers
- 🔒 Encrypted links keep assignments secret
- 🎯 Pre-assignments for when you want specific matches
- ⚡ No sign-up, no downloads - just visit and use

## About Security

Your Secret Santa assignments are protected by encryption, so links can't be easily guessed. Here's what you should know:

**Is it safe?**
- The links are encrypted to prevent casual snooping
- Someone would need your specific link to see an assignment
- If someone gets a link, they can only see those two names (who gives and who receives)
- Worst case: someone spoils the surprise - no sensitive information is at risk

**What this means:**
This is perfect for friendly gift exchanges among family, friends, or coworkers. The encryption keeps things fun and prevents accidental spoilers, but this isn't designed for highly sensitive data. Think of it like a sealed envelope - good enough for a game, but not a bank vault.

**Technical note:** The app uses AES-GCM encryption with PBKDF2 key derivation. While the encryption keys are built into the app (making it possible for someone technical to decrypt if they really wanted to), it provides adequate protection for the use case - keeping holiday surprises fun!

## For Developers

### Getting Started

**Prerequisites:**
- Node.js (v18 or higher)
- npm or yarn

**Installation:**
Clone the repository and install dependencies.

**Development:**
Start the development server.

**Building:**
Build the application for production deployment.

**Testing:**
Run the test suite.

### Technology Stack

- React 18 with TypeScript
- React Router v7
- Tailwind CSS v4
- Vite build tool
- Vitest for testing

### Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Main pages (MainPage, RevealPage)
- `/src/utils` - Utility functions (encryption, assignment algorithm)
- `/src/i18n` - Translations for 9 languages
- `/src/types` - TypeScript type definitions

### Technical Details: Encryption

The application uses **AES-GCM** (Advanced Encryption Standard) encryption with:
- 256-bit key length
- PBKDF2 key derivation with 100,000 iterations
- Random initialization vector (IV) for each link
- Static salt for key derivation

**Security considerations:**
- The encryption passphrase and salt are hardcoded in the client-side code
- Anyone with access to the source code could theoretically decrypt links
- For improved security, consider: user-provided passwords per event, server-side encryption, or time-limited links

For this use case (friendly gift exchanges), the current security model provides adequate protection while keeping the app simple and fully client-side.

## Contributing

This is a personal/educational project. Feel free to fork and adapt for your own use!

## License

Open source and available for personal and educational use.

---

Built with festive cheer for making holiday gift exchanges more fun and organized! 🎅🎄🎁
