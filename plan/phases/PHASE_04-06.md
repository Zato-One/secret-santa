# Phases 4-6: Core Assignment Logic, Encryption & Link Generation

This document provides detailed implementation guidance for Phases 4-6, covering the assignment algorithm, encryption system, and link generation interface.

---

## Phase 4: Assignment Algorithm

### Overview
Build the core Secret Santa assignment algorithm that generates giver-receiver pairs while respecting constraints (no reciprocal pairs, pre-assignments) and attempting to form optimal gift chains.

### Step 18: Create TypeScript types for participants and assignments

**Goal**: Define type-safe data structures for the entire assignment system

**Types to create in `src/types/assignment.ts`**:
- `Participant`: Basic participant data (id, name)
- `PreAssignment`: Pre-defined giver-receiver pair (giverId, receiverId)
- `Assignment`: Final assignment result (giverId, receiverId, giverName, receiverName)
- `AssignmentGraph`: Internal representation for algorithm (adjacency list structure)
- `AssignmentResult`: Algorithm output (assignments array, success flag, error message)
- `EncryptedAssignment`: Data structure for encryption (giverName, receiverName, language)

**Validation considerations**:
- Ensure type safety for all ID references
- Include optional error/warning fields
- Support both index-based and ID-based participant references

### Step 19: Implement basic random assignment algorithm

**Goal**: Create the foundation algorithm that assigns each participant a random receiver

**File**: `src/utils/assignmentAlgorithm.ts`

**Core function**: `generateAssignments(participants, preAssignments)`

**Algorithm approach**:
1. Create array of available receivers (all participants)
2. For each giver, randomly select from remaining receivers
3. Remove selected receiver from available pool
4. Return array of Assignment objects

**Edge cases to handle**:
- Single participant (impossible case - should fail gracefully)
- Two participants (special case - will always be reciprocal)
- Empty participants array

**Testing considerations**:
- Verify all participants get exactly one assignment
- Verify all participants are assigned exactly once as receivers
- Test with 3, 4, 5, 10, and 20 participants

### Step 20: Add reciprocal pair detection and prevention logic

**Goal**: Ensure no participant gives to someone who gives back to them

**Implementation approach**:
1. Track assignments in both directions (giver→receiver and receiver→giver maps)
2. When selecting receiver for participant A, exclude any participant B where B→A already exists
3. Implement backtracking if selection becomes impossible
4. Add maximum retry limit to prevent infinite loops

**Key functions**:
- `isReciprocal(giverA, receiverB, existingAssignments)`: Check if creating A→B would violate constraint
- `getValidReceivers(giver, existingAssignments, allParticipants)`: Filter out invalid choices
- `detectReciprocals(assignments)`: Validation function for testing

**Retry strategy**:
- If algorithm fails to find valid assignment, start over with different random seed
- Implement maximum 10-20 retry attempts
- Return error if no valid solution found after retries

### Step 21: Integrate pre-assignments into assignment algorithm

**Goal**: Respect user-defined giver-receiver pairs while still preventing reciprocals

**Implementation approach**:
1. Apply pre-assignments first before random assignment
2. Mark pre-assigned givers as "already assigned"
3. Mark pre-assigned receivers as "already taken"
4. Run random assignment algorithm for remaining participants
5. Validate that pre-assignments don't create reciprocals with generated assignments

**Pre-assignment validation**:
- Check pre-assignments don't directly conflict (A→B and A→C)
- Check pre-assignments don't create reciprocal pairs (A→B and B→A)
- Check pre-assignments don't reference non-existent participants
- Check pre-assignments don't form impossible constraints for remaining participants

**Error handling**:
- Return descriptive errors for invalid pre-assignments
- Provide suggestion messages (e.g., "Pre-assignment creates reciprocal pair with...")

### Step 22: Add cycle formation logic for optimal gift chains

**Goal**: Attempt to create longer gift chains rather than minimal cycles

**Cycle formation strategy**:
1. Build graph representation of possible assignments
2. Use depth-first search to form longest possible cycles
3. Prioritize single long cycle over multiple short cycles
4. Fall back to shorter cycles if long cycle impossible

**Implementation details**:
- Graph representation: adjacency list where nodes are participants, edges are valid assignments
- DFS-based cycle detection to find Hamiltonian path/cycle when possible
- Heuristic: Start from participants with fewest valid choices
- Track visited nodes to prevent getting stuck in local cycles

**Quality metrics**:
- Calculate average cycle length
- Prefer solutions with fewer total cycles
- Report cycle statistics for debugging

**Note**: This is an optimization attempt - if complex, can be deprioritized in favor of simpler random assignment

### Step 23: Implement assignment validation and retry mechanism

**Goal**: Robust validation and automatic retry with backtracking

**Validation checks**:
1. Every participant is a giver exactly once
2. Every participant is a receiver exactly once
3. No reciprocal pairs exist (A→B and B→A)
4. All pre-assignments are respected
5. No self-assignments (A→A)

**Validation functions**:
- `validateAssignments(assignments, participants, preAssignments)`: Comprehensive validation
- `validateNoReciprocals(assignments)`: Specific reciprocal check
- `validateCompleteness(assignments, participants)`: Check all participants included
- `validatePreAssignments(assignments, preAssignments)`: Verify pre-assignments honored

**Retry mechanism**:
1. Wrap assignment generation in retry loop (max 20 attempts)
2. Use different random seeds for each attempt
3. Log failure reasons for debugging
4. Return clear error message if all retries fail

**Error messages should specify**:
- Type of constraint violation
- Which participants are involved
- Suggestion for resolution (if applicable)

### Step 24: Test algorithm with various participant counts and pre-assignments

**Goal**: Ensure algorithm works reliably across all scenarios

**Test file**: `src/utils/assignmentAlgorithm.test.ts`

**Test scenarios**:
1. Small groups: 3, 4, 5 participants (edge cases)
2. Medium groups: 10, 15 participants (typical use)
3. Large groups: 50, 100 participants (performance test)
4. With no pre-assignments
5. With 1-2 pre-assignments
6. With many pre-assignments (half of participants)
7. Invalid pre-assignments (should fail gracefully)
8. Impossible constraints (should return error)

**Validation for each test**:
- No reciprocal pairs
- All participants assigned
- Pre-assignments respected
- Algorithm completes within reasonable time (< 1 second)

**Run tests**:
- Use browser console for manual testing initially
- Consider adding proper test framework (Vitest) if project expands

---

## Phase 5: Encryption Implementation

### Overview
Implement AES-256-GCM encryption for assignment data to create secure, shareable reveal links using browser's Web Crypto API.

### Step 25: Create encryption utility module with Web Crypto API

**Goal**: Set up encryption infrastructure with proper key derivation

**File**: `src/utils/encryption.ts`

**Key derivation approach**:
- Use hardcoded passphrase (acceptable for friendly Secret Santa context)
- Derive AES-256 key using PBKDF2 from passphrase
- Use consistent salt for deterministic key generation
- Cache derived key to avoid re-derivation

**Crypto API setup**:
- Import Web Crypto API: `window.crypto.subtle`
- Define encryption algorithm: AES-256-GCM
- Set up key derivation parameters (PBKDF2, iterations: 100000)

**Configuration constants**:
- `ENCRYPTION_PASSPHRASE`: Hardcoded string (e.g., "secret-santa-2024-encryption-key")
- `SALT`: Fixed salt for key derivation (Base64 encoded)
- `ALGORITHM`: "AES-GCM"
- `KEY_LENGTH`: 256

**Helper functions**:
- `deriveKey(passphrase)`: Generate CryptoKey from passphrase
- `arrayBufferToBase64(buffer)`: Convert ArrayBuffer to Base64
- `base64ToArrayBuffer(base64)`: Convert Base64 to ArrayBuffer

### Step 26: Implement AES-256-GCM encryption function

**Goal**: Encrypt assignment data into secure ciphertext

**Function signature**: `encryptData(data: object): Promise<string>`

**Encryption process**:
1. Serialize input data to JSON string
2. Convert JSON string to Uint8Array (UTF-8 encoding)
3. Generate random 12-byte IV (initialization vector)
4. Encrypt data using AES-GCM with derived key and IV
5. Combine IV + ciphertext into single ArrayBuffer
6. Encode result as Base64URL string
7. Return Base64URL string

**Data format** (binary structure):
- Bytes 0-11: IV (12 bytes)
- Bytes 12+: Ciphertext (variable length)

**Error handling**:
- Catch encryption failures (invalid data, crypto API errors)
- Return descriptive error messages
- Log errors to console for debugging

**Security notes**:
- IV must be unique for each encryption (use crypto.getRandomValues)
- GCM mode provides authenticated encryption (integrity check built-in)
- Key never leaves browser memory

### Step 27: Implement corresponding decryption function

**Goal**: Decrypt ciphertext back to original assignment data

**Function signature**: `decryptData(encryptedString: string): Promise<object>`

**Decryption process**:
1. Decode Base64URL string to ArrayBuffer
2. Extract IV (first 12 bytes)
3. Extract ciphertext (remaining bytes)
4. Decrypt using AES-GCM with derived key and extracted IV
5. Convert decrypted ArrayBuffer to UTF-8 string
6. Parse JSON string back to object
7. Return parsed object

**Error handling**:
- Invalid Base64URL format → "Invalid link format"
- Decryption failure (wrong key/tampered data) → "Link is invalid or corrupted"
- JSON parsing failure → "Link contains invalid data"
- Return null or throw custom error for each case

**Validation**:
- Check decrypted object has expected fields (giverName, receiverName)
- Validate data types of decrypted fields
- Return validation error if structure is incorrect

### Step 28: Add Base64URL encoding/decoding utilities

**Goal**: URL-safe encoding for encrypted data in URLs

**Functions to implement**:
- `base64UrlEncode(data: ArrayBuffer): string`
- `base64UrlDecode(encoded: string): ArrayBuffer`

**Base64URL format**:
- Replace `+` with `-`
- Replace `/` with `_`
- Remove padding `=` characters
- This makes encrypted data safe for URL parameters

**Implementation approach**:
1. Use built-in `btoa()`/`atob()` for standard Base64
2. Apply character replacements for URL-safe variant
3. Handle padding correctly during decode

**Helper functions**:
- `arrayBufferToBase64Url(buffer)`: ArrayBuffer → Base64URL string
- `base64UrlToArrayBuffer(str)`: Base64URL string → ArrayBuffer
- `stringToArrayBuffer(str)`: UTF-8 string → ArrayBuffer
- `arrayBufferToString(buffer)`: ArrayBuffer → UTF-8 string

### Step 29: Create function to generate encrypted URL from assignment data

**Goal**: Complete flow from assignment object to shareable reveal link

**Function signature**: `generateRevealLink(giverName: string, receiverName: string, language: string, baseUrl: string): Promise<string>`

**Process**:
1. Create data object: `{ giverName, receiverName, language }`
2. Encrypt data object using `encryptData()`
3. Get encrypted Base64URL string
4. Construct full URL: `${baseUrl}/reveal/${encryptedString}`
5. Return complete URL

**URL structure**:
- Base URL: `https://yourdomain.com` (or `http://localhost:5173` in dev)
- Path: `/reveal/:encryptedData`
- Example: `https://yourdomain.com/reveal/aBc123XyZ...`

**Integration with assignment algorithm**:
- Call this function for each assignment after generation
- Store resulting URLs alongside participant names
- Display URLs in results section

**Considerations**:
- URL length: AES-GCM + Base64URL typically produces 200-300 character strings
- Browser URL length limits: ~2000 characters (safe for this use case)
- Language code needed for multi-language support (Phase 14)

### Step 30: Test encryption/decryption with sample data

**Goal**: Verify encryption is working correctly and securely

**Test scenarios**:
1. Basic encryption/decryption round-trip
2. Same data encrypted twice produces different ciphertexts (due to random IV)
3. Same ciphertext decrypts to same data consistently
4. Invalid/corrupted ciphertext produces error
5. Tampered ciphertext produces error
6. Large data (100+ characters) encrypts/decrypts correctly

**Manual tests** (browser console):
- Encrypt sample assignment: `{ giverName: "Alice", receiverName: "Bob", language: "en" }`
- Decrypt result and verify match
- Modify encrypted string and verify decryption fails
- Test with special characters in names (Unicode, accents)

**Test data**:
- Simple ASCII names: "John" → "Jane"
- Names with spaces: "Mary Anne" → "Bob Smith"
- Unicode names: "José" → "Müller"
- Long names: 50+ character names

**Performance testing**:
- Measure encryption time (should be < 50ms)
- Measure decryption time (should be < 50ms)
- Test 100 sequential encryptions (simulate large group)

---

## Phase 6: Main Page - Link Generation & Display

### Overview
Complete the main page by adding assignment generation button, integrating algorithm + encryption, and displaying shareable reveal links.

### Step 31: Add "Generate Assignments" button to main page

**Goal**: Provide clear UI trigger for assignment generation

**Location**: Below participant list and pre-assignment section

**Button requirements**:
- Large, prominent button with festive styling
- Disabled state when < 3 participants
- Loading state during generation
- Clear call-to-action text: "Generate Secret Santa Assignments"

**Styling considerations**:
- Christmas colors: green or red background with white text
- Hover effect: slightly darker shade or scale transform
- Disabled state: gray background, reduced opacity
- Loading state: spinner icon or animated text

**Validation before generation**:
- At least 3 participants required
- Show error message if insufficient participants
- Optionally warn if no pre-assignments (just informational)

### Step 32: Implement assignment generation trigger and error handling

**Goal**: Wire up button to algorithm and handle all possible outcomes

**onClick handler implementation**:
1. Validate participant count (>= 3)
2. Set loading state
3. Call assignment algorithm with participants and pre-assignments
4. Handle algorithm success: proceed to encryption
5. Handle algorithm failure: display error message
6. Reset loading state

**State management**:
- `isGenerating`: boolean for loading state
- `generatedLinks`: array of { participantName, revealUrl } objects
- `generationError`: string for error message display
- `showResults`: boolean to control results visibility

**Error handling scenarios**:
- Insufficient participants: "You need at least 3 participants"
- Algorithm failure (no valid solution): "Could not generate valid assignments. Try removing some pre-assignments."
- Encryption failure: "An error occurred while generating links. Please try again."
- Impossible constraints: "Pre-assignments create impossible constraints. Please review."

**User feedback**:
- Show inline error message below button
- Clear error when user modifies participants
- Provide retry button if generation fails

### Step 33: Create results display component showing participant names with links

**Goal**: Display generated reveal links in user-friendly format

**Component**: `AssignmentResults` (new component or section in main page)

**Layout**:
- Header: "Your Secret Santa Assignments Are Ready!"
- Instruction text: "Share these links with each participant. Each link reveals only that person's assignment."
- List of participants with their reveal links
- Copy buttons next to each link
- "Copy All Links" button at bottom

**Link display format** (for each participant):
- Participant name (bold)
- Full reveal URL (truncated with ellipsis, tooltip shows full URL)
- Copy button (clipboard icon)
- Copied confirmation (brief animation/text)

**Styling**:
- Card layout with gentle shadow
- Alternating row colors or dividers
- Monospace font for URLs
- Icon-based actions (copy icon, check icon for success)

### Step 34: Add copy-to-clipboard functionality for individual links

**Goal**: Allow easy copying of individual participant links

**Implementation approach**:
1. Use Clipboard API: `navigator.clipboard.writeText(url)`
2. Add copy button next to each link
3. Show success feedback (icon change or text)
4. Handle copy failures gracefully

**Copy button behavior**:
- Click button → URL copied to clipboard
- Button icon changes to checkmark for 2 seconds
- Success message appears briefly: "Link copied!"
- Button returns to normal state after 2 seconds

**Fallback for older browsers**:
- Use document.execCommand('copy') if Clipboard API unavailable
- Create temporary textarea, select text, copy, remove textarea

**Accessibility**:
- Add aria-label: "Copy link for [Name]"
- Ensure keyboard accessible (Enter key triggers copy)
- Provide visual and text feedback for screen readers

### Step 35: Add "Copy All Links" functionality

**Goal**: Provide convenient way to copy all links at once for sharing

**Implementation**:
- Button at bottom of results section
- Copies all links as formatted text to clipboard
- Success feedback message

**Format for copied text**:
```
Secret Santa Assignments

[Name 1]: [URL 1]
[Name 2]: [URL 2]
[Name 3]: [URL 3]
...

Share each link only with the corresponding participant!
```

**Alternative format** (more copy-paste friendly):
```
Send to [Name 1]:
Your Secret Santa link: [URL 1]

Send to [Name 2]:
Your Secret Santa link: [URL 2]
...
```

**User experience**:
- Large button: "Copy All Links"
- Success message: "All links copied! You can now paste them into your messaging app."
- Consider providing format options (simple list vs. formatted messages)

### Step 36: Style results section with clear visual hierarchy

**Goal**: Make results section intuitive and visually appealing

**Visual hierarchy**:
1. Section header (largest, bold)
2. Instruction text (medium, clear color)
3. Participant entries (structured list)
4. Action buttons (prominent but secondary to content)

**Layout structure**:
- Container with max-width for readability
- Padding and spacing for breathing room
- Clear separation between entries (borders or gaps)
- Sticky header if list is long

**Christmas theming**:
- Background: light snow white or subtle pattern
- Borders: festive red or green
- Icons: use Christmas colors
- Optional decorative elements (small snowflakes, stars)

**Responsive design**:
- Mobile: Stack elements vertically, full-width buttons
- Tablet: Slightly wider layout, smaller buttons
- Desktop: Optimal reading width, inline copy buttons

**Polish**:
- Smooth transitions when results appear
- Hover states for interactive elements
- Focus indicators for keyboard navigation
- Loading skeleton while generating

---

## Integration Notes

### Phase 4-5 Integration
- Assignment algorithm output feeds directly into encryption functions
- Each assignment object must be encrypted individually
- Error handling should propagate from algorithm → encryption → UI

### Phase 5-6 Integration
- Encryption functions called after successful assignment generation
- Base URL for links should be configurable (env variable or constant)
- Language parameter included for future multi-language support

### Phase 6-7 Connection
- Results section styling will be further polished in Phase 7
- Christmas theming applied here should be consistent with Phase 7 updates

### Testing Strategy
- Test algorithm independently first (Phase 4, Step 24)
- Test encryption independently (Phase 5, Step 30)
- Test full flow integration (Phase 6, Step 32)
- Manual end-to-end testing after Phase 6 completion

---

## Success Criteria

**Phase 4 Complete When**:
- Algorithm generates valid assignments for any participant count >= 3
- No reciprocal pairs in output
- Pre-assignments always respected
- Algorithm returns clear errors for impossible scenarios

**Phase 5 Complete When**:
- Encryption/decryption round-trip works flawlessly
- URLs are URL-safe and copyable
- Invalid/tampered links produce appropriate errors
- Performance is acceptable (< 100ms per operation)

**Phase 6 Complete When**:
- Generate button triggers full assignment flow
- Results display all reveal links correctly
- Copy functionality works on all links
- Error states handled gracefully
- UI is intuitive and visually clear

---

## Development Order

1. Build and test assignment algorithm (Phase 4) first
2. Build and test encryption (Phase 5) independently
3. Integrate both into main page (Phase 6)
4. Polish UI after functionality confirmed working

This approach ensures core logic is solid before adding UI complexity.
