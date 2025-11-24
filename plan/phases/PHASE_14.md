# Phase 14: Multi-Language Support - Detailed Plan

This phase adds comprehensive internationalization (i18n) support, allowing users to generate Secret Santa assignments in 9 different languages.

**Languages to support:**
1. Czech (cs) - Primary language
2. English (en) - Default
3. German (de)
4. Spanish (es)
5. French (fr)
6. Italian (it)
7. Polish (pl)
8. Portuguese (pt)
9. Russian (ru)

---

## Step 76: Design translation structure and create language constant files

**Objective:** Create a robust, maintainable translation system with all necessary constants.

**Implementation details:**
- Create `/src/i18n/` directory for all internationalization code
- Create `/src/i18n/types.ts` with TypeScript types for translations
- Create `/src/i18n/languages.ts` with language metadata (code, name, flag emoji)
- Create `/src/i18n/translations/` directory for translation files
- Create individual files for each language: `en.ts`, `cs.ts`, `de.ts`, etc.
- Define translation keys for all UI text in the application

**Translation categories needed:**
- Main page header and titles
- Participant management section
- Pre-assignment section
- Generate button and status messages
- Results section
- Reveal page confirmation flow
- Reveal page final message
- Error messages
- Form labels and placeholders
- Button text
- Validation messages

**Example structure:**
```typescript
interface Translations {
  mainPage: {
    title: string
    subtitle: string
    // ... more keys
  }
  revealPage: {
    // ... keys
  }
  // ... more sections
}
```

---

## Step 77: Implement language selector component on main page

**Objective:** Add a language dropdown that persists user selection.

**Implementation details:**
- Create `/src/components/LanguageSelector.tsx` component
- Design as a clean dropdown menu with flag emojis + language names
- Position prominently on main page (top-right corner of header)
- Store selected language in React state
- Persist language preference in localStorage
- Load language preference on page mount
- Export language selector from `/src/components/index.ts`

**Component features:**
- Display current language with flag emoji
- Dropdown shows all 9 languages with flag + name
- Smooth dropdown animation
- Accessible keyboard navigation
- Christmas-themed styling to match existing UI
- Mobile-responsive design

---

## Step 78: Add translations for 9 languages

**Objective:** Create complete, accurate translations for all UI text.

**Implementation details:**
- Translate all text strings for Czech (cs)
- Translate all text strings for German (de)
- Translate all text strings for Spanish (es)
- Translate all text strings for French (fr)
- Translate all text strings for Italian (it)
- Translate all text strings for Polish (pl)
- Translate all text strings for Portuguese (pt)
- Translate all text strings for Russian (ru)
- Keep English (en) as reference/default
- Create `/src/i18n/index.ts` to export translation getter function

**Quality requirements:**
- Natural, culturally appropriate translations
- Consistent terminology across each language
- Proper handling of plurals where needed
- Appropriate formality level for each language
- Test special characters render correctly

---

## Step 79: Update encryption to include language code in URL

**Objective:** Ensure language preference is encrypted in reveal links.

**Implementation details:**
- Language is already in `EncryptedAssignment` type (done)
- Update `MainPage.tsx` to pass selected language to `generateRevealLink()`
- Replace hardcoded `'en'` with current language state
- Test that language is properly encrypted in generated URLs

**Testing:**
- Generate links in different languages
- Verify encrypted URL format remains the same
- Ensure URL length is reasonable for sharing

---

## Step 80: Update decryption to extract language code

**Objective:** Extract language preference from reveal links.

**Implementation details:**
- Decryption already returns `language` field from `EncryptedAssignment` (done)
- No changes needed in `encryption.ts` utilities
- Language code will be available in `assignmentData.language` on RevealPage
- Add fallback to 'en' if language is missing or invalid

**Edge cases to handle:**
- Missing language field (old links) → default to 'en'
- Invalid language code → default to 'en'
- Unsupported language → default to 'en'

---

## Step 81: Implement language-aware text rendering on reveal page

**Objective:** Display RevealPage in the language specified in the link.

**Implementation details:**
- Update `RevealPage.tsx` to use translations based on `assignmentData.language`
- Import translation getter function
- Replace all hardcoded strings with translated versions
- Handle all page states: loading, error, first-confirmation, second-confirmation, reveal
- Update all error messages to use translations
- Ensure proper text rendering for all character sets (Cyrillic, accented chars)

**Sections to translate:**
- Loading screen
- Error messages (all error types)
- First confirmation prompt
- Secret Santa explanation text
- Second confirmation modal
- Final reveal congratulations
- All button text

---

## Step 82: Test all languages for completeness and accuracy

**Objective:** Verify all translations work correctly and are complete.

**Testing checklist:**
- Test language selector on main page displays all 9 languages
- Test language selection persists on page refresh
- Test generating assignments in each language
- Test reveal links open in correct language
- Verify all text is translated (no English fallbacks visible)
- Check special characters render correctly
- Test on different devices and browsers
- Verify layout doesn't break with longer translations
- Test right-to-left reading if needed (not required for these 9 languages)
- Check mobile responsiveness with different text lengths

**Languages to test individually:**
- Czech (cs)
- English (en)
- German (de)
- Spanish (es)
- French (fr)
- Italian (it)
- Polish (pl)
- Portuguese (pt)
- Russian (ru)

---

## Step 83: Verify language switching updates all UI elements correctly

**Objective:** Ensure language switching is seamless and updates all visible text.

**Testing scenarios:**
- Switch language before adding participants
- Switch language after adding participants
- Switch language after adding pre-assignments
- Switch language after generating links (links should remain functional)
- Verify error messages appear in selected language
- Verify validation messages appear in selected language
- Test rapid language switching doesn't cause issues
- Verify localStorage persistence works correctly
- Test clearing localStorage defaults to English
- Test opening app in multiple tabs with different languages

**Expected behavior:**
- All UI text updates immediately on language change
- No page reload required
- Generated links from previous language still work
- Participant and pre-assignment data persists
- Error states display in new language
- Form placeholders update
- Button text updates
- All labels and hints update

---

## Implementation Order

1. Create i18n structure and English translations (Step 76)
2. Add language selector component (Step 77)
3. Add all other language translations (Step 78)
4. Update MainPage to use selected language (Step 79)
5. Update RevealPage to use link language (Steps 80-81)
6. Comprehensive testing of all languages (Steps 82-83)

---

## Success Criteria

Phase 14 is complete when:
- [ ] All 9 languages have complete translations
- [ ] Language selector is visible and functional on main page
- [ ] Selected language persists across page refreshes
- [ ] Generated reveal links open in the correct language
- [ ] All UI text updates when language is changed
- [ ] No hardcoded strings remain in components
- [ ] Special characters render correctly in all languages
- [ ] Mobile layout works with all language text lengths
- [ ] All tests pass for each language

---

## Notes

- Encryption/decryption already supports language field
- Focus on UI translation, not complex i18n features like pluralization rules
- Keep translations simple and clear
- Christmas emojis are universal, no need to translate
- Date/time formatting not needed for this app
- Number formatting not needed for this app
