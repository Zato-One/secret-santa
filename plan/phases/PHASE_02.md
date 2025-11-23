# Phase 2: Main Page - Participant Management

**Overview**: This phase focuses on building the participant management interface on the main page, allowing users to add, remove, and validate participants for the Secret Santa event.

**Dependencies**: Phase 1 must be completed (foundation, encryption utilities, types, and basic layout).

**Deliverables**: A functional participant management system with validation and visual feedback.

---

## Step 9: Create main page UI with title and introductory text

**File**: `app/page.tsx`

**Tasks**:
- Update the main page component with a festive title
- Add introductory text explaining the Secret Santa generator
- Structure the page layout with semantic sections
- Apply basic Tailwind styling for readability
- Ensure responsive layout on mobile and desktop

**Acceptance Criteria**:
- Title clearly identifies the application
- Instructions are clear and concise
- Layout is centered and visually balanced

---

## Step 10: Implement participant input field with add button

**File**: `app/page.tsx`

**Tasks**:
- Create controlled input component for participant name
- Add "Add Participant" button next to input
- Implement onChange handler to track input value
- Implement onClick handler to add participant to list
- Clear input field after successful addition
- Style input and button with Tailwind for consistency

**Acceptance Criteria**:
- Input accepts text and updates on typing
- Button adds participant when clicked
- Input clears after adding participant
- Basic styling matches the design aesthetic

---

## Step 11: Create participant list display component with remove functionality

**Files**:
- `app/page.tsx` (main integration)
- `components/ParticipantList.tsx` (optional separate component)

**Tasks**:
- Display list of added participants
- Show each participant's name clearly
- Add remove button (X or trash icon) for each participant
- Implement remove handler to delete participant from list
- Show empty state message when no participants
- Style list items with appropriate spacing and hover states

**Acceptance Criteria**:
- All added participants appear in the list
- Each participant has a visible remove button
- Clicking remove deletes the participant
- Empty state displays helpful message

---

## Step 12: Add form validation (no empty names, no duplicate names)

**File**: `app/page.tsx` or `lib/validation.ts`

**Tasks**:
- Prevent adding empty or whitespace-only names
- Check for duplicate names (case-insensitive comparison)
- Display error message for validation failures
- Disable add button or show visual feedback for invalid input
- Trim whitespace from participant names before adding

**Acceptance Criteria**:
- Empty names cannot be added
- Duplicate names (regardless of case) are rejected
- Clear error messages guide the user
- Names are automatically trimmed

---

## Step 13: Implement state management for participants list

**File**: `app/page.tsx`

**Tasks**:
- Use React useState hook to manage participants array
- Type participants as `Participant[]` using types from Phase 1
- Implement addParticipant function
- Implement removeParticipant function
- Ensure state updates trigger re-renders correctly

**Acceptance Criteria**:
- State properly stores participant data
- Adding participants updates state immutably
- Removing participants updates state immutably
- UI reflects state changes immediately

---

## Step 14: Add visual feedback for adding/removing participants

**File**: `app/page.tsx`

**Tasks**:
- Add success feedback when participant is added (color change, animation, or message)
- Add confirmation feedback when participant is removed
- Implement smooth transitions for list item additions/removals
- Consider adding subtle animations (fade-in, slide-in)
- Ensure feedback is not overwhelming

**Acceptance Criteria**:
- Users receive clear feedback on successful actions
- Animations enhance UX without being distracting
- Transitions are smooth and responsive

---

## Step 15: Create minimum participants validation (at least 3 participants required)

**File**: `app/page.tsx`

**Tasks**:
- Display participant count
- Show validation message if fewer than 3 participants
- Disable "Generate Assignments" button (to be added in later phase) when insufficient participants
- Update validation message dynamically as participants are added/removed
- Style validation message distinctly (warning color)

**Acceptance Criteria**:
- Count displays correct number of participants
- Validation prevents proceeding with fewer than 3 participants
- Message clearly states the requirement
- Validation updates in real-time

---

## Testing Checklist for Phase 2

- [ ] Add a participant successfully
- [ ] Remove a participant successfully
- [ ] Attempt to add empty name (should fail)
- [ ] Attempt to add duplicate name (should fail)
- [ ] Add exactly 3 participants (validation should pass)
- [ ] Remove participant to drop below 3 (validation should activate)
- [ ] Test on mobile viewport
- [ ] Test on desktop viewport
- [ ] Verify all visual feedback appears correctly
- [ ] Verify smooth transitions and animations

---

## Notes

- Keep UI simple and intuitive
- Focus on functionality over elaborate styling (Christmas theme comes in later phases)
- Ensure all TypeScript types are properly used
- Test edge cases (very long names, special characters, etc.)
- Remember to update PLAN.md checkboxes after completing each step
