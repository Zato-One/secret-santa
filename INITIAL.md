# Secret Santa - Initial Project Plan

## Project Overview

Simple Secret Santa website deployable to Vercel (frontend only, no backend). Stateless application with all data encrypted in URLs.

## Pages

### 1. Main Page (Root Domain)

**Functionality:**
- Add participant names (unlimited quantity)
- Pre-assignment option: Before randomization, ask if anyone has pre-selected relationships
  - User can specify who already agreed to give to whom
  - These relationships are locked before random assignment
- Generate Secret Santa assignments with constraints:
  - No direct reciprocal pairs (if A gives to B, then B must NOT give to A)
  - Form cycles where possible
  - Example valid assignment: A→C, C→D, D→B, B→A
- Generate unique encrypted links for each participant
- Display list of all participants with their corresponding links
- **Important:** Organizer sees only names and links, NOT the actual assignments

**Pre-assignment Flow:**
1. User adds all participant names
2. System asks: "Does anyone have a pre-selected assignment?"
3. If yes, user selects who gives to whom
4. These become locked relationships
5. Remaining assignments generated randomly with constraints

### 2. Reveal Page (domain/encrypted-code)

**Functionality:**
- Accessed via unique encrypted link
- Initial screen:
  - Question: "Are you [NAME]?"
  - Introductory description explaining Secret Santa
- Double confirmation flow:
  - First confirmation: Click to confirm identity
  - Second confirmation: Modal/panel asking "Are you really [NAME]?"
  - Options: Confirm (continue) or Disagree (cancel)
- After confirmation: Display who they should give a gift to
- **No authentication:** If wrong person confirms, they see someone else's assignment (acceptable risk - just spoils surprise)

## Technical Implementation

### Encryption & URL Structure

**Technology:**
- AES-256-GCM encryption
- Web Crypto API (built into browsers)
- Base64URL encoding for URL safety

**Encrypted Data:**
- Giver name
- Receiver name
- (Future: Language code)

**URL Format:**
- `domain.com/reveal/[ENCRYPTED_BASE64_STRING]`
- Expected code length: ~80-100 characters
- Example: `yoursite.com/reveal/k8jH2mN9pL3qR7sT4vW6xY8zA1bC3dE5fG7hJ9kM2nP4qS6tU8vX0yZ`

**Key Points:**
- No backend, completely stateless
- Encryption key hardcoded in frontend
- Not truly secure (key accessible in source code)
- Sufficient obfuscation for friendly Secret Santa use case
- Each link is self-contained with all necessary information

## Design Guidelines

### Visual Style
- Modern, clean design
- Simple but good-looking
- Don't overdo decorations

### Christmas Theme
- **Colors:** Red, green, gold, white
- **Decorations:** Snowflakes, stars, ornaments, Christmas trees
- **Universal approach:** Not Santa-centric
- Works for Czech and European Christmas traditions
- Avoid American-specific Christmas imagery

## Future Enhancements

### Multi-language Support
- Language selector on main page
- 9 languages total: 8 common languages + Czech
- Second page (reveal) displays in selected language
- Language code added to encrypted URL data (third piece of information)
- Minimal impact on URL length (~2-3 additional characters)

## Deployment

- Target platform: Vercel
- Frontend only (no backend required)
- Static site deployment
