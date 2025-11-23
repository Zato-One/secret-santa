# Phase 1: Foundation & Setup - Detailed Implementation Plan

## Phase Overview

This phase establishes the foundational infrastructure for the Secret Santa application. We'll set up a Next.js 14+ project with TypeScript and Tailwind CSS, create the core encryption utilities, and establish the basic project structure and routing.

**Phase Goals:**
- Initialize a modern Next.js application with proper tooling
- Implement secure, browser-native encryption utilities
- Create type-safe TypeScript definitions
- Establish routing structure for main and reveal pages
- Set up responsive layout foundation

**Expected Deliverables:**
- Fully configured Next.js project ready for development
- Working encryption/decryption system with validation
- Type definitions for all core data structures
- Basic responsive layout component

---

## Step 1: Initialize Next.js Project with TypeScript and Tailwind CSS

**Objective:** Bootstrap a new Next.js 14+ application with TypeScript and Tailwind CSS pre-configured.

**Implementation Details:**
1. Use `npx create-next-app@latest` with the following configuration:
   - TypeScript: Yes
   - ESLint: Yes
   - Tailwind CSS: Yes
   - `src/` directory: No (use app directory directly)
   - App Router: Yes
   - Import alias: `@/*` for root imports

2. Verify package.json includes:
   - next (v14 or higher)
   - react and react-dom
   - typescript
   - tailwindcss, postcss, autoprefixer
   - @types for React and Node

**Acceptance Criteria:**
- Project initializes without errors
- Dev server starts successfully with `npm run dev`
- TypeScript compilation works
- Tailwind CSS classes are processed correctly

**Testing:**
- Run `npm run dev` and verify the default Next.js page loads
- Check that Tailwind utility classes render properly

---

## Step 2: Configure Project Structure with Necessary Directories

**Objective:** Organize the project with clear separation of concerns using standard Next.js conventions.

**Directory Structure:**
```
secret-santa/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout (Step 8)
│   ├── page.tsx           # Main page (later phases)
│   └── reveal/            # Reveal page route (Step 3)
├── components/            # React components (later phases)
├── lib/                   # Utility functions and business logic
│   ├── crypto/           # Encryption utilities (Steps 4-6)
│   └── utils/            # General utilities
├── types/                # TypeScript type definitions (Step 7)
└── public/               # Static assets
```

**Implementation Details:**
1. Create all directories listed above
2. Add .gitkeep files if needed to preserve empty directories
3. Ensure proper TypeScript path aliases are configured in tsconfig.json

**Acceptance Criteria:**
- All directories exist and are properly structured
- Import paths resolve correctly (e.g., `@/lib/crypto`)
- No build errors related to module resolution

---

## Step 3: Set Up Basic Routing Structure for Main Page and Reveal Page

**Objective:** Establish the two primary routes: main page and dynamic reveal page.

**Implementation Details:**

1. **Main Page** (`app/page.tsx`):
   - Create a minimal placeholder component
   - Export as default component
   - Add basic structure (will be expanded in Phase 2)

2. **Reveal Page** (`app/reveal/[code]/page.tsx`):
   - Create dynamic route using Next.js conventions
   - Accept encrypted code as URL parameter
   - Create placeholder component (will be expanded in Phases 6-7)
   - Add proper TypeScript typing for params

**File Structure:**
```
app/
├── page.tsx              # Main Secret Santa setup page
└── reveal/
    └── [code]/
        └── page.tsx      # Reveal page with encrypted code param
```

**TypeScript Interface Example:**
```typescript
type PageProps = {
  params: { code: string }
}
```

**Acceptance Criteria:**
- `/` route renders the main page
- `/reveal/test-code` renders the reveal page
- URL parameters are accessible in the reveal page component
- No TypeScript errors

**Testing:**
- Navigate to both routes and verify they render
- Check that params.code is accessible in reveal page

---

## Step 4: Create Encryption Utility Module Using Web Crypto API (AES-256-GCM)

**Objective:** Implement browser-native encryption using the Web Crypto API with AES-256-GCM algorithm.

**Location:** `lib/crypto/encryption.ts`

**Core Functions to Implement:**

1. **Key Derivation:**
   - Use a hardcoded passphrase (acceptable for this stateless app)
   - Derive a 256-bit AES key using PBKDF2
   - Use a fixed salt (since we need deterministic keys)

2. **Encryption Setup:**
   - Algorithm: AES-256-GCM
   - IV generation: Random 12-byte initialization vector per encryption
   - Auth tag: Included automatically with GCM mode

**Technical Specifications:**

```typescript
// Algorithm configuration
const ALGORITHM = 'AES-GCM'
const KEY_LENGTH = 256
const IV_LENGTH = 12
const SALT_LENGTH = 16
const PBKDF2_ITERATIONS = 100000

// Passphrase (hardcoded - acceptable for this use case)
const PASSPHRASE = 'secret-santa-encryption-key-2024'
```

**Key Functions:**
- `deriveKey()`: Derives AES key from passphrase using PBKDF2
- `generateIV()`: Creates random initialization vector
- Helper functions for ArrayBuffer conversions

**Acceptance Criteria:**
- Key derivation produces consistent results
- IV generation creates random 12-byte values
- No external dependencies (pure Web Crypto API)
- Proper TypeScript typing for all functions

**Security Considerations:**
- Web Crypto API is browser-native and secure
- GCM mode provides authenticated encryption
- Hardcoded key is acceptable for this stateless, client-side app
- IV must be unique for each encryption operation

---

## Step 5: Create base64URL Encoding/Decoding Utility Functions

**Objective:** Implement URL-safe base64 encoding for encrypted data to be embedded in URLs.

**Location:** `lib/crypto/encoding.ts`

**Implementation Details:**

Base64URL is standard base64 with URL-safe modifications:
- Replace `+` with `-`
- Replace `/` with `_`
- Remove padding `=` characters

**Functions to Implement:**

1. **arrayBufferToBase64Url(buffer: ArrayBuffer): string**
   - Convert ArrayBuffer to base64
   - Replace URL-unsafe characters
   - Remove padding

2. **base64UrlToArrayBuffer(base64url: string): ArrayBuffer**
   - Reverse URL-safe replacements
   - Add padding if needed
   - Decode to ArrayBuffer

**Helper Functions:**
- `arrayBufferToBase64()`: Standard base64 encoding
- `base64ToArrayBuffer()`: Standard base64 decoding

**Acceptance Criteria:**
- Round-trip encoding/decoding preserves data integrity
- Output contains only URL-safe characters
- No padding characters in encoded output
- Handles various data lengths correctly

**Testing:**
- Test with various ArrayBuffer sizes
- Verify URL safety (no +, /, or = characters)
- Confirm round-trip: encode → decode → matches original

---

## Step 6: Implement Encryption and Decryption Functions with Test Data Validation

**Objective:** Complete the encryption module with high-level encrypt/decrypt functions and validate with test data.

**Location:** `lib/crypto/encryption.ts` (extend from Step 4)

**Functions to Implement:**

1. **encrypt(data: string): Promise&lt;string&gt;**
   - Convert string to ArrayBuffer
   - Generate random IV
   - Encrypt using AES-GCM
   - Concatenate IV + encrypted data
   - Return base64URL encoded result

2. **decrypt(encryptedData: string): Promise&lt;string&gt;**
   - Decode base64URL to ArrayBuffer
   - Extract IV from first 12 bytes
   - Extract ciphertext from remaining bytes
   - Decrypt using AES-GCM
   - Convert result to string
   - Handle decryption errors gracefully

**Data Flow:**
```
Encryption: String → UTF-8 → Encrypt → IV+Ciphertext → Base64URL → URL
Decryption: URL → Base64URL → IV+Ciphertext → Decrypt → UTF-8 → String
```

**Error Handling:**
- Catch and handle decryption failures
- Return meaningful error messages
- Validate input formats

**Testing Strategy:**
Create a simple test script or function to validate:
```typescript
const testData = { giver: "Alice", receiver: "Bob" }
const encrypted = await encrypt(JSON.stringify(testData))
const decrypted = await decrypt(encrypted)
// Verify: JSON.parse(decrypted) matches testData
```

**Acceptance Criteria:**
- Encryption produces different outputs for same input (due to random IV)
- Decryption correctly recovers original data
- Round-trip encryption/decryption is lossless
- Invalid encrypted data throws appropriate errors
- Functions work with various data lengths

**Testing:**
- Encrypt and decrypt simple strings
- Encrypt and decrypt JSON objects
- Test error handling with invalid encrypted data
- Verify that each encryption produces unique output

---

## Step 7: Create TypeScript Types for Participant, Assignment, and EncryptedData

**Objective:** Define type-safe interfaces for all core data structures used throughout the application.

**Location:** `types/index.ts`

**Type Definitions:**

1. **Participant**
   ```typescript
   type Participant = {
     id: string           // Unique identifier (UUID or nanoid)
     name: string         // Participant's name
   }
   ```

2. **PreAssignment**
   ```typescript
   type PreAssignment = {
     giverId: string      // Participant who gives
     receiverId: string   // Participant who receives
   }
   ```

3. **Assignment**
   ```typescript
   type Assignment = {
     giver: Participant   // Person giving the gift
     receiver: Participant // Person receiving the gift
   }
   ```

4. **EncryptedData**
   ```typescript
   type EncryptedData = {
     giver: string        // Giver's name
     receiver: string     // Receiver's name (the secret)
   }
   ```

5. **AssignmentResult**
   ```typescript
   type AssignmentResult = {
     participant: Participant
     encryptedLink: string    // Full URL with encrypted code
   }
   ```

**Additional Types:**
```typescript
type AssignmentError =
  | 'insufficient-participants'
  | 'impossible-assignment'
  | 'invalid-pre-assignment'

type RevealState =
  | 'initial'           // First confirmation screen
  | 'confirming'        // Second confirmation dialog
  | 'revealed'          // Final reveal screen
```

**Acceptance Criteria:**
- All types are exported from `types/index.ts`
- TypeScript compilation succeeds
- Types can be imported with `@/types`
- No `any` types used
- Proper documentation comments for complex types

**Best Practices:**
- Use `type` instead of `interface` for simple structures
- Add JSDoc comments for clarity
- Consider making types immutable with `Readonly<T>` if appropriate

---

## Step 8: Set Up Basic Layout Component with Responsive Container

**Objective:** Create the root layout with responsive container, basic styling, and Christmas theme preparation.

**Location:** `app/layout.tsx`

**Implementation Details:**

1. **Root Layout Structure:**
   ```typescript
   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode
   }) {
     return (
       <html lang="en">
         <body>
           <main className="min-h-screen">
             <div className="container mx-auto px-4 py-8 max-w-4xl">
               {children}
             </div>
           </main>
         </body>
       </html>
     )
   }
   ```

2. **Metadata Configuration:**
   ```typescript
   export const metadata = {
     title: 'Secret Santa',
     description: 'Generate encrypted Secret Santa assignments',
   }
   ```

3. **Responsive Container:**
   - Mobile: Full width with padding
   - Tablet: Constrained width
   - Desktop: Max width of 4xl (896px)
   - Consistent vertical spacing

**Tailwind Classes:**
- `min-h-screen`: Full viewport height
- `container mx-auto`: Centered responsive container
- `px-4 py-8`: Consistent spacing
- `max-w-4xl`: Maximum content width

**Font Setup:**
- Import default Next.js font optimization (Inter or similar)
- Prepare for Christmas-themed fonts in later phases

**Acceptance Criteria:**
- Layout renders on all pages
- Content is properly centered and responsive
- Adequate padding on mobile devices
- Consistent spacing across breakpoints
- Metadata appears correctly in browser tab

**Testing:**
- Test on mobile (320px width)
- Test on tablet (768px width)
- Test on desktop (1920px width)
- Verify consistent spacing and centering

---

## Phase Completion Checklist

Before marking Phase 1 as complete, verify:

- [ ] Project builds without errors (`npm run build`)
- [ ] All TypeScript types are properly defined
- [ ] Encryption/decryption round-trip works correctly
- [ ] Both routes (main and reveal) are accessible
- [ ] Layout is responsive across all screen sizes
- [ ] No console errors in development mode
- [ ] All dependencies are properly installed
- [ ] Git repository is clean and organized

---

## Dependencies for Next Phases

Phase 1 provides the foundation for:
- **Phase 2**: Participant management will use Participant types
- **Phase 3**: Pre-assignment selection will use PreAssignment types
- **Phase 4**: Assignment algorithm will use Assignment types
- **Phase 5**: Link generation will use encryption utilities
- **Phase 6-7**: Reveal pages will use decryption utilities and EncryptedData types

---

## Technical Notes

**Framework Choices:**
- Next.js 14+ with App Router for modern React patterns
- TypeScript for type safety and better developer experience
- Tailwind CSS for rapid, responsive styling
- Web Crypto API for zero-dependency encryption

**Best Practices:**
- Use server components by default (add 'use client' only when needed)
- Implement proper error boundaries in later phases
- Follow Next.js file conventions for automatic routing
- Keep utility functions pure and testable

**Common Pitfalls to Avoid:**
- Don't use Pages Router (use App Router)
- Don't install crypto libraries (use Web Crypto API)
- Don't add 'use client' to layout.tsx unless absolutely necessary
- Don't forget to use async/await with encryption functions

---

## Success Criteria

Phase 1 is complete when:
1. A developer can clone the repository and run `npm install && npm run dev`
2. The application loads at `http://localhost:3000`
3. Both `/` and `/reveal/test` routes are accessible
4. The encryption test script successfully encrypts and decrypts data
5. All 8 steps in PLAN.md are checked off as complete
6. No TypeScript, ESLint, or build errors exist

---

**Next Phase:** Phase 2 - Main Page - Participant Management
