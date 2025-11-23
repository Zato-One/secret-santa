# Secret Santa Implementation Plan

This document outlines the complete implementation plan for the Secret Santa web application. The project is a stateless, frontend-only application deployable to Vercel that generates encrypted Secret Santa assignments.

**Current Phase**: Phase 1 - Foundation & Setup
**Completed Steps**: 8 / 75
**Overall Progress**: 11%

---

## Phase 1: Foundation & Setup

- [x] **Step 1**: Initialize Next.js project with TypeScript and Tailwind CSS
- [x] **Step 2**: Configure project structure with necessary directories (app, components, lib, types)
- [x] **Step 3**: Set up basic routing structure for main page and reveal page
- [x] **Step 4**: Create encryption utility module using Web Crypto API (AES-256-GCM)
- [x] **Step 5**: Create base64URL encoding/decoding utility functions
- [x] **Step 6**: Implement encryption and decryption functions with test data validation
- [x] **Step 7**: Create TypeScript types for Participant, Assignment, and EncryptedData
- [x] **Step 8**: Set up basic layout component with responsive container

---

## Phase 2: Main Page - Participant Management

- [ ] **Step 9**: Create main page UI with title and introductory text
- [ ] **Step 10**: Implement participant input field with add button
- [ ] **Step 11**: Create participant list display component with remove functionality
- [ ] **Step 12**: Add form validation (no empty names, no duplicate names)
- [ ] **Step 13**: Implement state management for participants list
- [ ] **Step 14**: Add visual feedback for adding/removing participants
- [ ] **Step 15**: Create minimum participants validation (at least 3 participants required)

---

## Phase 3: Main Page - Pre-Assignment Selection

- [ ] **Step 16**: Create pre-assignment selection UI toggle/button
- [ ] **Step 17**: Implement dropdown interface for selecting giver and receiver pairs
- [ ] **Step 18**: Add visual display of locked pre-assignments
- [ ] **Step 19**: Implement validation to prevent invalid pre-assignments (no self-assignment, no duplicates)
- [ ] **Step 20**: Add ability to remove pre-assignment pairs
- [ ] **Step 21**: Create state management for pre-assignments

---

## Phase 4: Main Page - Assignment Algorithm

- [ ] **Step 22**: Implement assignment algorithm that respects pre-assignments
- [ ] **Step 23**: Add constraint: prevent direct reciprocal pairs (A→B means B cannot→A)
- [ ] **Step 24**: Implement cycle formation logic for optimal assignment chains
- [ ] **Step 25**: Add validation to ensure all participants are assigned
- [ ] **Step 26**: Create fallback logic for impossible assignment scenarios
- [ ] **Step 27**: Add testing for various assignment scenarios

---

## Phase 5: Main Page - Link Generation & Display

- [ ] **Step 28**: Implement link generation using encryption utility
- [ ] **Step 29**: Create encrypted URL structure (domain/reveal/[encrypted-code])
- [ ] **Step 30**: Display generated links for each participant
- [ ] **Step 31**: Add copy-to-clipboard functionality for each link
- [ ] **Step 32**: Implement visual confirmation when link is copied
- [ ] **Step 33**: Ensure organizer cannot see actual assignments (only names and links)

---

## Phase 6: Reveal Page - Core Functionality

- [ ] **Step 34**: Create reveal page route with dynamic encrypted parameter
- [ ] **Step 35**: Implement URL parameter decryption logic
- [ ] **Step 36**: Handle decryption errors gracefully with error page
- [ ] **Step 37**: Create initial identity confirmation screen ("Are you [NAME]?")
- [ ] **Step 38**: Add introductory Secret Santa explanation text
- [ ] **Step 39**: Implement first confirmation button with smooth transition

---

## Phase 7: Reveal Page - Double Confirmation Flow

- [ ] **Step 40**: Create second confirmation modal/panel
- [ ] **Step 41**: Implement "Are you really [NAME]?" confirmation dialog
- [ ] **Step 42**: Add confirm and disagree buttons with proper handlers
- [ ] **Step 43**: Implement smooth transitions between confirmation states
- [ ] **Step 44**: Create final reveal screen showing receiver name
- [ ] **Step 45**: Add celebratory visual elements to reveal screen

---

## Phase 8: Christmas Theme - Design System

- [ ] **Step 46**: Create color palette with Christmas colors (red, green, gold, white)
- [ ] **Step 47**: Design typography system with festive but readable fonts
- [ ] **Step 48**: Implement responsive layout for mobile and desktop
- [ ] **Step 49**: Create reusable button components with Christmas styling
- [ ] **Step 50**: Design card/panel components with subtle Christmas theming

---

## Phase 9: Christmas Theme - Decorative Elements

- [ ] **Step 51**: Add CSS-based snowflake animations
- [ ] **Step 52**: Implement star decorations in header/footer
- [ ] **Step 53**: Add subtle ornament graphics in corners/borders
- [ ] **Step 54**: Create Christmas tree accent elements
- [ ] **Step 55**: Ensure decorations are tasteful and not overwhelming
- [ ] **Step 56**: Test responsive behavior of decorative elements

---

## Phase 10: Polish & User Experience

- [ ] **Step 57**: Add loading states for assignment generation
- [ ] **Step 58**: Implement smooth transitions between all states
- [ ] **Step 59**: Add helpful tooltips and guidance text
- [ ] **Step 60**: Create 404 page for invalid routes
- [ ] **Step 61**: Implement error boundaries for graceful error handling
- [ ] **Step 62**: Add accessibility features (ARIA labels, keyboard navigation)

---

## Phase 11: Testing & Validation

- [ ] **Step 63**: Test with minimum participants (3 people)
- [ ] **Step 64**: Test with large groups (20+ participants)
- [ ] **Step 65**: Validate encryption/decryption with various data lengths
- [ ] **Step 66**: Test pre-assignment scenarios (none, some, many)
- [ ] **Step 67**: Verify reciprocal pair prevention works correctly
- [ ] **Step 68**: Test all edge cases (impossible assignments, invalid URLs)
- [ ] **Step 69**: Verify responsive design on various devices

---

## Phase 12: Deployment Configuration

- [ ] **Step 70**: Create Vercel deployment configuration file
- [ ] **Step 71**: Set up environment variables if needed
- [ ] **Step 72**: Configure build settings for Next.js static export
- [ ] **Step 73**: Test production build locally
- [ ] **Step 74**: Deploy to Vercel and verify functionality
- [ ] **Step 75**: Test deployed application with real encrypted URLs

---

## Notes

### Implementation Approach
- Each step should deliver visible progress when possible
- Use placeholder content initially, refine in later steps
- Test functionality immediately after implementation
- Update this file's checkboxes after completing each step

### Technical Decisions
- **Framework**: Next.js 14+ with App Router for Vercel deployment
- **Styling**: Tailwind CSS for responsive design and rapid development
- **Language**: TypeScript for type safety
- **Encryption**: Web Crypto API (browser native, no external dependencies)

### Assignment Algorithm Constraints
1. No participant gives to themselves
2. No direct reciprocal pairs (if A→B, then B≠A)
3. Pre-assignments are locked before randomization
4. All participants must be assigned
5. Preference for cycle formation when possible

### Security Considerations
- Encryption key will be hardcoded in frontend (acceptable for this use case)
- Links are self-contained and stateless
- No backend authentication required
- Wrong person confirming identity is acceptable risk

### Future Enhancements (Not in Current Plan)
- Multi-language support (9 languages)
- Language code in encrypted data
- Enhanced decoration options
- Gift budget suggestions

---

**Remember**: After completing each step, update the checkbox from `- [ ]` to `- [x]` and increment the "Completed Steps" counter and "Overall Progress" percentage at the top of this file.
