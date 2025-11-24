export type LanguageCode = 'en' | 'cs' | 'de' | 'es' | 'fr' | 'it' | 'pl' | 'pt' | 'ru'

export interface Language {
  code: LanguageCode
  name: string
  nativeName: string
  flag: string
}

export interface Translations {
  mainPage: {
    title: string
    subtitle: string
    decorations: string
    addParticipants: {
      title: string
      inputPlaceholder: string
      addButton: string
      noParticipants: string
      noParticipantsHint: string
      participantCount: string
      preAssignedBadge: string
    }
    preAssignments: {
      title: string
      description: string
      giverLabel: string
      receiverLabel: string
      selectPlaceholder: string
      addButton: string
      noPreAssignments: string
      preAssignmentCount: string
    }
    generate: {
      button: string
      buttonGenerating: string
      buttonNeedMore: string
      errorTitle: string
    }
    results: {
      title: string
      description: string
      copyLink: string
      copied: string
      open: string
      copyAll: string
      copiedAll: string
      copyAllHint: string
      copiedAllMessage: string
    }
    errors: {
      emptyName: string
      nameTooLong: string
      duplicateName: string
      selfAssignment: string
      duplicatePreAssignment: string
      giverAlreadyAssigned: string
      receiverAlreadyAssigned: string
      generationFailed: string
    }
  }
  revealPage: {
    loading: {
      title: string
      subtitle: string
    }
    error: {
      missingData: {
        title: string
        message: string
      }
      invalidLink: {
        title: string
        message: string
      }
      invalidFormat: {
        title: string
        message: string
      }
      corrupted: {
        title: string
        message: string
      }
      cannotLoad: {
        title: string
        message: string
      }
      unexpected: {
        title: string
        message: string
      }
      tipLabel: string
      tipMessage: string
    }
    firstConfirmation: {
      question: string
      welcomeText: string
      secretText: string
      yesButton: string
      noButton: string
    }
    secondConfirmation: {
      question: string
      subtitle: string
      yesButton: string
      noButton: string
    }
    reveal: {
      title: string
      congratulations: string
      messagePrefix: string
      messageSuffix: string
      reminder: string
    }
  }
  common: {
    secretSanta: string
    loading: string
  }
}
