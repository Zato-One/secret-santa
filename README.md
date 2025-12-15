# 🎅 Secret Santa Generator 🎄

A web application for organizing Secret Santa gift exchanges with encrypted participant assignments and multi-language support.

## Features

- **Easy Participant Management**: Add participants with simple name input
- **Pre-assignments**: Define specific giver-receiver pairs before generating assignments
- **Encrypted Links**: Each participant receives a unique encrypted link to reveal their assignment
- **Multi-language Support**: Available in English, Czech, German, Polish, French, Spanish, Italian, Russian, and Portuguese
- **Mobile-Friendly**: Responsive design that works on all devices
- **No Backend Required**: Fully client-side application

## How It Works

1. Add participants by entering their names
2. (Optional) Set up pre-assignments for specific pairings
3. Generate assignments - the algorithm ensures everyone gives and receives a gift
4. Share unique encrypted links with each participant
5. Each participant opens their link to discover who they're buying for

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Testing**: Vitest

## Encryption & Security

### Encryption Algorithm

The application uses **AES-GCM** (Advanced Encryption Standard in Galois/Counter Mode) with:
- **256-bit key length** for strong encryption
- **PBKDF2** (Password-Based Key Derivation Function 2) for key derivation
- **100,000 iterations** for key stretching
- **12-byte initialization vector (IV)** generated randomly for each link
- **Static salt** (`'secret-santa-salt-2024'`)

### Security Considerations

**This encryption is NOT cryptographically secure for sensitive data**, but it is sufficient for this use case. Here's why:

**Limitations:**
- The encryption passphrase and salt are hardcoded in the client-side source code
- Anyone with access to the source code can decrypt the links
- The application uses "security through obscurity" of the link itself

**Why it's acceptable:**
- An attacker would need to obtain a participant's link first
- The only information that could be deciphered is the participant names
- The worst-case scenario is someone spoiling the surprise - no sensitive data is exposed
- This is a fun holiday activity, not a banking application

**Potential Improvements:**
While the current implementation includes a salt, additional security measures could include:
- User-provided passwords for each Secret Santa event (instead of a hardcoded passphrase)
- Server-side encryption with proper secret management
- Time-limited links that expire after the reveal

For this application's purpose (organizing friendly gift exchanges), the current security model provides adequate protection against casual snooping while keeping the implementation simple and fully client-side.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

Clone the repository and install dependencies.

### Development

Start the development server.

### Building for Production

Build the application for production deployment.

### Testing

Run the test suite.

## Usage

### Adding Participants

1. Enter a participant's name in the input field
2. Click "Add" or press Enter
3. Repeat for all participants (minimum 3 required)

### Creating Pre-assignments

Pre-assignments allow you to specify that certain people should give to certain other people:

1. Navigate to the "Pre-assignments" section
2. Select a giver from the first dropdown
3. Select a receiver from the second dropdown
4. Click "Add Pre-assignment"

The algorithm will respect these assignments when generating the complete list.

### Generating and Sharing Links

1. Click "Generate Secret Santa Assignments"
2. Unique encrypted links will be created for each participant
3. Copy individual links or copy all links at once
4. Share each link with the corresponding participant via email, messaging, etc.

**Important**: Make sure each participant receives only their own link!

### Revealing Assignments

When a participant opens their link:
1. They'll see a festive reveal page
2. The page will display who they're buying a gift for
3. The reveal happens instantly - no server calls required

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Main application pages (MainPage, RevealPage)
- `/src/utils` - Utility functions (encryption, assignment algorithm)
- `/src/i18n` - Internationalization and translations
- `/src/types` - TypeScript type definitions

## Contributing

This is a personal/educational project. Feel free to fork and adapt for your own use.

## License

This project is open source and available for personal and educational use.

## Acknowledgments

Built with festive cheer for making holiday gift exchanges more fun and organized! 🎁
