import type { Translations } from '../types'

export const en: Translations = {
  mainPage: {
    title: 'Secret Santa',
    subtitle: 'Create your Secret Santa assignments',
    decorations: '❄️ 🎁 ⭐ 🎁 ❄️',
    addParticipants: {
      title: 'Add Participants',
      inputPlaceholder: 'Enter participant name',
      addButton: 'Add Participant',
      noParticipants: '🎄 No participants yet',
      noParticipantsHint: 'Add your first participant to get started!',
      participantCount: 'Participants',
      preAssignedBadge: '🎯',
    },
    preAssignments: {
      title: 'Pre-Assignments (Optional)',
      description: 'Specify who should give to whom. The algorithm will respect these assignments.',
      giverLabel: 'Giver',
      receiverLabel: 'Receiver',
      selectPlaceholder: 'Select...',
      addButton: 'Add Pre-Assignment',
      noPreAssignments: 'No pre-assignments yet',
      preAssignmentCount: 'Pre-Assignments',
    },
    generate: {
      button: 'Generate Secret Santa Assignments',
      buttonGenerating: 'Generating assignments...',
      buttonNeedMore: 'Need at least 3 participants (currently {count})',
      errorTitle: 'Generation Error',
    },
    results: {
      title: '🎉 Your Secret Santa Assignments Are Ready! 🎉',
      description: 'Share these links with each participant. Each link reveals only that person\'s assignment.',
      copyLink: 'Copy Link',
      copied: 'Copied!',
      open: 'Open',
      copyAll: 'Copy All Links',
      copiedAll: 'All Links Copied!',
      copyAllHint: 'Click to copy all links at once',
      copiedAllMessage: 'All links copied! You can now paste them into your messaging app.',
    },
    errors: {
      emptyName: 'Please enter a name',
      nameTooLong: 'Name is too long (maximum 50 characters)',
      duplicateName: 'This participant already exists',
      selfAssignment: 'A participant cannot give to themselves',
      duplicatePreAssignment: 'This pre-assignment already exists',
      giverAlreadyAssigned: '{name} is already pre-assigned as a giver',
      receiverAlreadyAssigned: '{name} is already pre-assigned as a receiver (only reciprocal pairs are allowed)',
      generationFailed: 'Failed to generate assignments',
    },
  },
  revealPage: {
    loading: {
      title: 'Loading Your Assignment...',
      subtitle: 'Please wait while we prepare your Secret Santa reveal',
    },
    error: {
      missingData: {
        title: 'Missing Link Data',
        message: 'This link appears to be incomplete. Please check the link and try again, or contact the organizer for a new link.',
      },
      invalidLink: {
        title: 'Invalid Link',
        message: 'This link appears to be invalid or incomplete. Please contact the organizer for a new link.',
      },
      invalidFormat: {
        title: 'Invalid Link Format',
        message: 'This link appears to be incomplete or invalid. Please contact the organizer for a new link.',
      },
      corrupted: {
        title: 'Link Corrupted',
        message: 'This link has been corrupted and cannot be opened. Please contact the organizer for a new link.',
      },
      cannotLoad: {
        title: 'Cannot Load Assignment',
        message: 'Unable to load your assignment. Please contact the organizer for a new link.',
      },
      unexpected: {
        title: 'Unexpected Error',
        message: 'Something went wrong while loading your assignment. Please try again or contact the organizer.',
      },
      tipLabel: 'Tip:',
      tipMessage: 'Make sure you copied the entire link, including all characters at the end.',
    },
    firstConfirmation: {
      question: 'Are you {name}?',
      welcomeText: 'Welcome to Secret Santa! You\'ve been randomly matched with someone to give a gift to.',
      secretText: 'This is a surprise, so make sure you\'re the only one looking at this screen! 🤫',
      yesButton: 'Yes, that\'s me! 🎅',
      noButton: 'No, that\'s not me',
    },
    secondConfirmation: {
      question: 'Are you really {name}?',
      subtitle: 'Just making sure before we reveal your Secret Santa assignment!',
      yesButton: 'Yes, I\'m {name}',
      noButton: 'No, go back',
    },
    reveal: {
      title: 'You\'re Secret Santa for...',
      congratulations: '🎁 Congratulations! 🎁',
      messagePrefix: 'You\'re giving a gift to',
      messageSuffix: '!',
      reminder: 'Remember to keep this a secret and start thinking about a thoughtful gift. Happy holidays! 🎄',
    },
  },
  common: {
    secretSanta: 'Secret Santa',
    loading: 'Loading...',
  },
}
