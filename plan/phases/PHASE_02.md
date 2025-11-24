# Phase 2: Main Page - Participant Management

**Goal:** Build a fully functional participant management system on the main page with Christmas-themed UI.

**Context:** Phase 1 established the project foundation with Vite, React, TypeScript, Tailwind CSS, and React Router. The basic Layout component with Christmas theming is ready. MainPage currently has only a header.

---

## Step 7: Create main page component with header and basic layout

**Current State:**
- MainPage has header "🎅 Secret Santa 🎄" and subtitle
- Layout component provides Christmas-themed gradient background

**What to Build:**
- Restructure MainPage into clear sections:
  - Header section (already exists)
  - Participant management section (new)
  - Results section placeholder (new, hidden initially)
- Use semantic HTML structure with proper containers
- Ensure proper spacing and centering using Tailwind utilities

**Success Criteria:**
- Page has distinct visual sections for different functionalities
- Layout is centered and responsive
- Clean separation of concerns in component structure

---

## Step 8: Build participant input form with name field and add button

**Dependencies:** Step 7 completed

**What to Build:**
- Create a form with:
  - Text input field for participant name
  - "Add Participant" button
  - Proper label for accessibility
- Style form with Christmas colors:
  - Input: white background, green border on focus
  - Button: Christmas green background, white text, hover effects
- Handle form submission (prevent default page reload)
- Clear input field after successful addition

**Technical Details:**
- Use controlled input (value + onChange)
- Form should submit on Enter key or button click
- Button should have rounded corners and shadow for depth
- Add visual feedback for hover and active states

**Success Criteria:**
- Form visually appealing with Christmas theme
- Input clears after adding participant
- Form submission prevented from reloading page

---

## Step 9: Implement participant list display with remove functionality

**Dependencies:** Step 8 completed

**What to Build:**
- Display list of participants below the input form
- Each participant entry shows:
  - Participant name
  - Remove button (❌ or trash icon)
- Empty state message when no participants added
- Style list items with:
  - Card-like appearance (white background, shadow)
  - Christmas red remove button with hover effect
  - Smooth transitions for adding/removing

**Technical Details:**
- Use flexbox or grid for participant list layout
- Remove button triggers deletion of specific participant
- Consider adding fade-in animation for new participants
- Ensure good spacing between list items

**Success Criteria:**
- Participants display in clean, organized list
- Remove button clearly visible and functional
- Empty state shows helpful message
- Visual feedback on hover/interaction

---

## Step 10: Add participant state management using React hooks

**Dependencies:** Steps 7-9 UI structure in place

**What to Build:**
- Create TypeScript interface for Participant:
  - id: string (unique identifier)
  - name: string
- Implement useState hook for participants array
- Add participant function:
  - Generate unique ID (timestamp or UUID)
  - Add new participant to state
- Remove participant function:
  - Filter out participant by ID

**Technical Details:**
- Define Participant type in src/types/index.ts
- Use functional state updates for array modifications
- IDs ensure correct removal even with duplicate names
- Consider using crypto.randomUUID() or Date.now() for IDs

**Success Criteria:**
- State updates trigger re-renders correctly
- Participants persist in state throughout session
- Adding/removing updates UI immediately
- Type safety enforced with TypeScript

---

## Step 11: Implement validation (prevent empty names, duplicates)

**Dependencies:** Step 10 completed

**What to Build:**
- Validation rules:
  1. Prevent adding participant with empty/whitespace-only name
  2. Prevent adding participant with duplicate name (case-insensitive)
- Display validation errors:
  - Show error message below input field
  - Style with Christmas red color
  - Clear error when user modifies input
- Disable "Add" button when input is invalid

**Technical Details:**
- Trim whitespace before validation
- Use toLowerCase() for case-insensitive duplicate check
- Error message examples:
  - "Please enter a name"
  - "This participant already exists"
- Consider adding visual shake animation for errors

**Success Criteria:**
- Cannot add empty names
- Cannot add duplicate names (case-insensitive)
- Clear, helpful error messages displayed
- Error state clears when user types

---

## Step 12: Style participant management UI with Christmas decorations

**Dependencies:** Steps 7-11 completed

**What to Build:**
- Enhance visual design with Christmas theme:
  - Add decorative snowflake emojis (❄️) or SVG icons
  - Add subtle animations (gentle float/pulse for decorations)
  - Use Christmas color palette consistently:
    - Primary actions: Christmas green
    - Destructive actions: Christmas red
    - Accents: Christmas gold
- Polish all interactive elements:
  - Smooth hover transitions
  - Subtle shadows and depth
  - Rounded corners for modern feel
- Ensure responsive design:
  - Mobile: stack elements vertically, full-width inputs
  - Tablet: slightly wider container
  - Desktop: max-width container, generous spacing

**Technical Details:**
- Use Tailwind's responsive prefixes (sm:, md:, lg:)
- Add @keyframes for custom animations if needed
- Consider adding Christmas tree (🎄) or gift (🎁) icons
- Ensure sufficient color contrast for accessibility

**Success Criteria:**
- UI feels festive and polished
- All interactions smooth and responsive
- Design works well on mobile, tablet, and desktop
- Maintains professional look while being festive

---

## Phase 2 Completion Checklist

After implementing all steps, verify:
- [ ] Can add participants with names
- [ ] Can remove participants individually
- [ ] Cannot add empty names
- [ ] Cannot add duplicate names
- [ ] Error messages display correctly
- [ ] UI has Christmas theme throughout
- [ ] Responsive on mobile, tablet, desktop
- [ ] All buttons and inputs have proper hover states
- [ ] Layout is clean and well-organized

---

## Notes for Implementation

**State Structure Example:**
```typescript
interface Participant {
  id: string
  name: string
}

const [participants, setParticipants] = useState<Participant[]>([])
```

**Component Organization:**
Consider keeping all logic in MainPage for now. In later phases, if complexity grows, can extract:
- ParticipantForm component
- ParticipantList component

**Testing Considerations:**
Manually test with:
- 0 participants
- 1 participant
- Many participants (10+)
- Long names
- Names with special characters
- Attempting to add duplicates
- Attempting to add empty names

**Performance Notes:**
For Phase 2, performance is not a concern with typical participant counts (5-20 people). No optimization needed.
