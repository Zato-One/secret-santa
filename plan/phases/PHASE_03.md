# Phase 3: Pre-Assignment Feature

**Goal:** Build a pre-assignment system that allows users to manually specify giver→receiver pairs before generating the full Secret Santa assignments.

**Context:** Phase 2 completed the participant management system. Users can now add/remove participants with validation for empty names and duplicates. Phase 3 adds the ability to pre-assign specific participants to give gifts to specific receivers, which the assignment algorithm will respect.

---

## Step 13: Create pre-assignment interface (modal or section)

**Current State:**
- MainPage has functional participant list management
- No pre-assignment UI exists yet

**What to Build:**
- Add a new section on MainPage below the participant list
- Section should be titled "Pre-Assignments (Optional)"
- Include explanatory text: "Specify who should give to whom. The algorithm will respect these assignments."
- Section should only be visible when there are at least 2 participants
- Use consistent Christmas theming with Phase 2
- Keep the interface simple and intuitive

**Technical Details:**
- Position section between participant list and (future) "Generate Assignments" button
- Use similar card styling as participant section (white background, shadow, rounded corners)
- Conditionally render: `{participants.length >= 2 && <PreAssignmentSection />}`
- Consider creating a separate component or keeping inline depending on complexity

**Success Criteria:**
- Pre-assignment section appears when 2+ participants exist
- Section hidden when fewer than 2 participants
- Visual hierarchy clear with proper spacing from other sections
- Christmas theme consistent with rest of page

---

## Step 14: Build giver-receiver selector dropdowns

**Dependencies:** Step 13 completed

**What to Build:**
- Create form with two dropdown selectors:
  - "Giver" dropdown: populated with all participant names
  - "Receiver" dropdown: populated with all participant names
- Add "Add Pre-Assignment" button next to dropdowns
- Style dropdowns with Christmas colors matching input fields from Phase 2
- Form should be inside the pre-assignment section

**Technical Details:**
- Use `<select>` elements with participant names as options
- Each option should use participant.id as value, display participant.name
- Dropdowns should have default "Select..." placeholder option
- Form layout:
  - Mobile: stack vertically
  - Tablet/Desktop: display inline with button
- Button styling should match "Add Participant" button from Phase 2
- Handle form submission to add pre-assignment

**Success Criteria:**
- Both dropdowns populate with current participant names
- Dropdowns update when participants are added/removed
- "Add Pre-Assignment" button triggers handler
- Form visually consistent with participant input form
- Responsive layout works on all screen sizes

---

## Step 15: Implement pre-assignment list display with remove option

**Dependencies:** Step 14 completed

**What to Build:**
- Display list of pre-assignments below the selector form
- Each pre-assignment shows: "[Giver] → [Receiver]" with remove button
- Empty state message: "No pre-assignments yet"
- Style pre-assignment items similar to participant list items
- Remove button styled consistently (❌ emoji or icon)

**Technical Details:**
- Create TypeScript interface for PreAssignment:
  - id: string (unique identifier)
  - giverId: string (references Participant.id)
  - receiverId: string (references Participant.id)
- Store pre-assignments in state: `useState<PreAssignment[]>([])`
- Display format: lookup participant names from IDs for display
- Remove button filters out pre-assignment by ID
- Consider using arrow emoji (→) or "gives to" text for clarity

**Success Criteria:**
- Pre-assignments display clearly with giver and receiver names
- List updates immediately when adding/removing
- Empty state shows when no pre-assignments exist
- Remove functionality works correctly
- Visual styling matches participant list aesthetics

---

## Step 16: Add validation for pre-assignments (prevent cycles, conflicts)

**Dependencies:** Step 15 completed

**What to Build:**
- Implement comprehensive validation rules:
  1. **Self-assignment**: Prevent participant from giving to themselves
  2. **Duplicate pre-assignments**: Prevent same giver→receiver pair twice
  3. **Giver already assigned**: Each giver can only be pre-assigned once
  4. **Minimum participants**: Require at least 3 participants before generating assignments
- Display validation errors below form with clear messages
- Disable "Add Pre-Assignment" button when selections invalid
- Add "Generate Assignments" button (disabled for now) that requires ≥3 participants

**Technical Details:**
- Validation checks to implement:
  - `giverId === receiverId` → "A participant cannot give to themselves"
  - Pre-assignment already exists → "This pre-assignment already exists"
  - `preAssignments.some(pa => pa.giverId === selectedGiverId)` → "[Giver] is already pre-assigned"
  - For generation button: `participants.length < 3` → "At least 3 participants required"
- Error messages styled with Christmas red color
- Clear errors when user changes selections
- Add "Generate Assignments" button to bottom of pre-assignment section:
  - Prominent styling (larger, gold accent)
  - Disabled state with tooltip/message explaining requirements
  - Will be functional in Phase 4

**Success Criteria:**
- Cannot add self-assignments (Alice → Alice)
- Cannot add duplicate pre-assignments
- Cannot pre-assign same giver twice
- Clear error messages for each validation failure
- "Generate Assignments" button visible but disabled with helpful message
- Button shows "Need at least 3 participants" when under minimum
- Validation errors clear when user fixes issues

---

## Step 17: Store pre-assignments in state alongside participants

**Dependencies:** Step 16 completed

**What to Build:**
- Ensure pre-assignments persist in component state
- Clean up pre-assignments when referenced participants are removed
- Implement cascade deletion: removing a participant removes associated pre-assignments
- Add visual indicators to participant list showing who has pre-assignments
- Optional: Add badge/icon next to participants involved in pre-assignments

**Technical Details:**
- Modify `handleRemove` for participants to also filter out pre-assignments:
  ```typescript
  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id))
    setPreAssignments(preAssignments.filter(
      pa => pa.giverId !== id && pa.receiverId !== id
    ))
  }
  ```
- Consider adding visual indicators:
  - Small badge next to participant name: "🎯 Pre-assigned as giver"
  - Or icon showing they're involved in pre-assignments
- State structure should be clean and type-safe

**Success Criteria:**
- Pre-assignments stored in state correctly
- Removing a participant automatically removes their pre-assignments
- No orphaned pre-assignments (referencing deleted participants)
- State updates are predictable and type-safe
- Optional visual indicators enhance user understanding

---

## Phase 3 Completion Checklist

After implementing all steps, verify:
- [ ] Pre-assignment section appears when 2+ participants exist
- [ ] Can select giver and receiver from dropdowns
- [ ] Can add pre-assignments showing "Giver → Receiver"
- [ ] Can remove pre-assignments individually
- [ ] Cannot add self-assignments
- [ ] Cannot add duplicate pre-assignments
- [ ] Cannot pre-assign same giver twice
- [ ] "Generate Assignments" button visible but disabled
- [ ] Button requires at least 3 participants
- [ ] Removing participant removes their pre-assignments
- [ ] UI maintains Christmas theme throughout
- [ ] Responsive on mobile, tablet, desktop
- [ ] All validation errors display clearly

---

## Notes for Implementation

**State Structure:**
Pre-assignments reference participants by ID, not name. This ensures data consistency when participant names are involved in pre-assignments.

**Type Definitions:**
Add to `src/types/index.ts`:
```typescript
export interface PreAssignment {
  id: string
  giverId: string
  receiverId: string
}
```

**Component Organization:**
Phase 3 adds significant complexity. Consider:
- Keeping all logic in MainPage for now (manageable with good organization)
- Or extracting `PreAssignmentSection` component if file becomes too large
- Remember: no file should exceed 500 lines (per CLAUDE.md)

**Testing Considerations:**
Manually test with:
- 0-2 participants (section hidden)
- 3+ participants (section visible, button enabled)
- Adding valid pre-assignments
- Attempting invalid pre-assignments (self, duplicate, double-giver)
- Removing participants with pre-assignments (cascade deletion)
- Various combinations of pre-assignments

**Algorithm Preparation:**
Phase 3 sets up data structures for Phase 4. The assignment algorithm will:
- Respect all pre-assignments as fixed constraints
- Generate random assignments for remaining participants
- Ensure no reciprocal pairs among non-pre-assigned participants

**Minimum Participant Rationale:**
Secret Santa requires at least 3 people because:
- 1 person: cannot give to themselves
- 2 people: creates reciprocal pair (A→B, B→A) which violates no-reciprocal rule
- 3+ people: enables valid non-reciprocal cycles (A→B→C→A)
