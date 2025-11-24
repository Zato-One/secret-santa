# Phase 3: Participant Assignment Experience

## Overview

This phase focuses on building the pre-assignment participant experience. It introduces the interface for entering participants, selecting assignment constraints, showing the pending assignment list, validating inputs, and persisting state between sessions.

**Total Steps:** 5

**Dependencies:** Completion of Phase 2

**Completion Criteria:**
- Steps 13–17 are fully implemented and verified
- Pre-assignment page presents intuitive entry and selection controls
- Participant list renders clearly with constraint indicators
- Validation prevents incomplete or conflicting inputs
- Participant data and constraints persist across sessions until assignments are generated

---

## Step 13: Design Pre-Assignment Entry UI

**Objective:** Provide a focused page section for entering participant names and preparation details before generating assignments.

**Actions:**
- Create a dedicated pre-assignment layout area that matches the project theme
- Add clear labels and helpers describing how to add participants and prerequisites
- Ensure primary controls are visually grouped for ease of scanning
- Include affordances for starting assignment preparation and navigating back if needed

**Expected Outputs:**
- Pre-assignment page section with headline, helper text, and grouped controls
- Visual hierarchy that highlights participant entry actions
- Layout consistent with established design patterns

**Verification:**
- Page renders the pre-assignment section without layout issues
- Labels and helpers are readable on all supported viewports
- Theming aligns with prior phases and remains accessible

---

## Step 14: Implement Participant Selectors

**Objective:** Add input controls for collecting participant names and constraint selections prior to assignment generation.

**Actions:**
- Provide fields for participant names with clear placeholder text
- Add selector controls for constraint options such as partner exclusions or gifting rules
- Ensure controls support keyboard and pointer interaction
- Maintain validation-ready structures for later checks

**Expected Outputs:**
- Participant name inputs with supporting labels
- Selector elements for constraint choices tied to each participant entry
- Accessible focus order and control states

**Verification:**
- Inputs accept text and selectors register option changes
- Controls are reachable via keyboard navigation
- Screen reader labels describe each field and selector purpose

---

## Step 15: Display Participant List Before Assignment Generation

**Objective:** Render a preview list that shows entered participants and their current constraint selections before running assignments.

**Actions:**
- Present entries in a structured list with names and associated constraints
- Include indicators for missing data or unresolved constraints
- Provide options to edit or remove entries prior to generation
- Keep the list updated in real time as fields change

**Expected Outputs:**
- Visible list of participants reflecting live form state
- Constraint badges or text descriptors aligned with each entry
- Edit and remove affordances adjacent to the related participant

**Verification:**
- Newly added participants appear immediately in the list
- Updates to constraints or names reflect without page reload
- Removing an entry consistently updates the displayed list

---

## Step 16: Validate Participant Inputs

**Objective:** Enforce rules that ensure the participant list is complete and conflict-free before assignments are generated.

**Actions:**
- Define validation states for required fields and invalid constraint combinations
- Surface inline messages that explain how to resolve issues
- Prevent progression when validation errors are present
- Preserve user input while highlighting fields needing attention

**Expected Outputs:**
- Clear error states for empty names, duplicate entries, or incompatible constraints
- Inline guidance describing the corrective action for each issue
- Disabled progression controls when validation fails

**Verification:**
- Submitting with invalid data triggers visible, contextual feedback
- Correction of errors clears messages without lingering artifacts
- Valid entries enable progression to assignment generation

---

## Step 17: Store Participant State for Assignment Generation

**Objective:** Persist pre-assignment participant data and constraints so users can resume preparation without losing progress.

**Actions:**
- Capture participant entries and constraint selections in durable storage appropriate for the client experience
- Restore stored entries when returning to the pre-assignment flow
- Keep state updates synchronized between storage and the on-screen list
- Provide a controlled way to reset stored data when starting over

**Expected Outputs:**
- Participant list and constraints remain available after page reloads
- Restored entries populate the pre-assignment UI automatically
- Reset action clears both the UI and stored state

**Verification:**
- Refreshing the page retains participants and constraint selections
- Storage updates mirror list changes without desynchronization
- Resetting state removes stored data and empties the pre-assignment list

---

## Phase Completion Checklist

Before marking this phase as complete, verify:

- [ ] Pre-assignment entry UI displays with thematic styling
- [ ] Participant selectors capture names and constraints accessibly
- [ ] Participant list updates live and exposes edit or remove options
- [ ] Validation blocks incomplete or conflicting participant setups
- [ ] Participant and constraint data persist across sessions until assignments run
- [ ] Reset mechanism clears stored participant state
- [ ] All steps 13–17 are marked complete in the main plan

---

## Notes

- Keep interactions lightweight to encourage quick participant entry
- Ensure accessibility considerations apply to all new controls and messages
- Maintain consistency with typography, spacing, and theming established in prior phases
