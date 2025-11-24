# Phase 8: Reveal Page - URL Parsing & Decryption

**Goal:** Implement the core functionality to extract, validate, and decrypt assignment data from reveal page URLs, providing the foundation for the identity confirmation and assignment display features.

**Prerequisites:** Phases 1-7 completed (encryption utilities exist, reveal page route configured)

---

## Step 43: Create reveal page component with route parameter

**Objective:** Set up the reveal page structure to receive and handle encrypted data from URL parameters.

**Current State:**
- Basic reveal page skeleton exists at `/src/pages/RevealPage.tsx`
- Route configured in App.tsx: `/reveal/:encryptedData`
- useParams hook already extracts encryptedData parameter

**Implementation Tasks:**
- Enhance component state management for decryption flow
- Add error state handling for invalid URLs
- Set up loading state for decryption process
- Create proper component structure for multi-step reveal flow

**State Requirements:**
- Loading state (decryption in progress)
- Error state (decryption failed)
- Success state (data decrypted, ready for confirmation)
- Assignment data state (stores decrypted EncryptedAssignment)

**Validation:**
- Component receives encryptedData parameter correctly
- Component handles missing parameter gracefully
- State management structure supports full reveal flow

---

## Step 44: Implement URL parameter extraction and validation

**Objective:** Extract encrypted data from URL and perform initial validation before attempting decryption.

**Extraction Logic:**
- Use useParams from react-router-dom to get encryptedData
- Handle undefined or empty parameter cases
- Trim whitespace if present
- Validate parameter exists before proceeding

**Validation Checks:**
- Parameter is not undefined or null
- Parameter is not empty string
- Parameter meets minimum length requirements
- Parameter contains only valid Base64URL characters

**Error Handling:**
- Display user-friendly error for missing parameter
- Show clear message for invalid parameter format
- Provide guidance on requesting valid link
- Avoid exposing technical details to user

**Implementation:**
- Run validation immediately on component mount
- Set error state if validation fails
- Only proceed to decryption if validation passes

---

## Step 45: Add decryption of URL parameter on page load

**Objective:** Decrypt the URL parameter using existing encryption utilities and store the result in component state.

**Decryption Flow:**
1. Extract validated URL parameter
2. Call decryptData function from encryption utilities
3. Handle async decryption operation
4. Store decrypted EncryptedAssignment in state
5. Transition to confirmation flow on success

**Integration:**
- Import decryptData from @/utils/encryption
- Use useEffect hook to trigger decryption on mount
- Handle Promise resolution/rejection properly
- Update loading state during decryption
- Store decrypted data in component state

**Success State:**
- Decrypted data contains giverName, receiverName, language
- Component transitions from loading to confirmation screen
- Data is ready for identity verification flow

**Dependencies:**
- Requires validated URL parameter from Step 44
- Uses existing decryptData utility from Phase 5

---

## Step 46: Handle decryption errors with user-friendly messages

**Objective:** Gracefully handle all decryption failure scenarios with clear, helpful error messages.

**Error Scenarios:**
1. Invalid encrypted data format
2. Corrupted or tampered data
3. Wrong encryption key (should not happen in normal use)
4. Browser compatibility issues
5. Network/performance issues

**Error Messages:**
- **Invalid format:** "This link appears to be incomplete or invalid"
- **Corrupted data:** "This link has been corrupted and cannot be opened"
- **General error:** "Unable to load your assignment. Please contact the organizer for a new link"
- Include recovery suggestion in all error messages

**User Experience:**
- Display errors prominently but not alarmingly
- Use warm, festive colors for error display
- Provide actionable next steps
- Avoid technical jargon
- Maintain Christmas theme even in error states

**Implementation:**
- Catch all decryption errors in try-catch block
- Map technical errors to user-friendly messages
- Set error state with appropriate message
- Render error UI component with festive styling
- Add optional "Try Again" button for transient errors

**Validation:**
- Test with intentionally corrupted URLs
- Test with shortened/truncated URLs
- Test with completely random strings
- Verify error messages are clear and helpful

---

## Step 47: Store decrypted assignment data in component state

**Objective:** Properly manage decrypted assignment data in React state for use in subsequent confirmation and reveal steps.

**State Structure:**
```
assignmentData: EncryptedAssignment | null
- giverName: string (person viewing the page)
- receiverName: string (person they're assigned to)
- language: string (language code for display)
```

**State Management:**
- Use useState hook for assignment data
- Initialize to null (no data loaded)
- Update only after successful decryption
- Preserve data throughout component lifecycle
- Use data to drive confirmation and reveal flows

**Data Flow:**
1. Initial state: null (loading)
2. Decryption in progress: still null
3. Decryption success: populated with EncryptedAssignment
4. Decryption failure: remains null (error state shown)

**Usage:**
- Confirmation screens use giverName for "Are you [NAME]?"
- Reveal screen uses receiverName for assignment display
- Language code reserved for future multi-language support (Phase 14)

**Validation:**
- State updates trigger appropriate UI changes
- Data persists across confirmation steps
- TypeScript types enforced throughout
- No data leakage or unintended state mutations

---

## Success Criteria

Phase 8 is complete when:
- Reveal page extracts encrypted data from URL parameter
- URL parameter validation prevents invalid data from reaching decryption
- Decryption successfully converts URL data to EncryptedAssignment object
- All decryption errors display user-friendly, actionable messages
- Decrypted assignment data stored in component state for next phases
- Error handling covers all edge cases without exposing technical details
- Loading states provide clear feedback during decryption process

---

## Notes

- Decryption utilities already exist from Phase 5 (encryptData/decryptData)
- Focus on robust error handling - users may share corrupted links
- Maintain festive Christmas theme even in error states
- This phase sets foundation for Phases 9 (confirmation) and 10 (reveal)
- Language field in EncryptedAssignment prepared for Phase 14 but not used yet
- Security: All decryption happens client-side using Web Crypto API
