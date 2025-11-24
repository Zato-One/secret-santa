import type { Translations } from '../types'

export const de: Translations = {
  mainPage: {
    title: 'Wichteln',
    subtitle: 'Erstellen Sie Ihre Wichtel-Zuordnungen',
    decorations: '❄️ 🎁 ⭐ 🎁 ❄️',
    addParticipants: {
      title: 'Teilnehmer hinzufügen',
      inputPlaceholder: 'Teilnehmernamen eingeben',
      addButton: 'Teilnehmer hinzufügen',
      noParticipants: '🎄 Noch keine Teilnehmer',
      noParticipantsHint: 'Fügen Sie Ihren ersten Teilnehmer hinzu, um zu beginnen!',
      participantCount: 'Teilnehmer',
      preAssignedBadge: '🎯',
    },
    preAssignments: {
      title: 'Vorzuordnungen (Optional)',
      description: 'Legen Sie fest, wer wem beschenken soll. Der Algorithmus wird diese Zuordnungen berücksichtigen.',
      giverLabel: 'Schenker',
      receiverLabel: 'Beschenkter',
      selectPlaceholder: 'Auswählen...',
      addButton: 'Vorzuordnung hinzufügen',
      noPreAssignments: 'Noch keine Vorzuordnungen',
      preAssignmentCount: 'Vorzuordnungen',
    },
    generate: {
      button: 'Wichtel-Zuordnungen generieren',
      buttonGenerating: 'Generiere Zuordnungen...',
      buttonNeedMore: 'Mindestens 3 Teilnehmer erforderlich (aktuell {count})',
      errorTitle: 'Generierungsfehler',
    },
    results: {
      title: '🎉 Ihre Wichtel-Zuordnungen sind fertig! 🎉',
      description: 'Teilen Sie diese Links mit jedem Teilnehmer. Jeder Link enthüllt nur die Zuordnung dieser Person.',
      copyLink: 'Link kopieren',
      copied: 'Kopiert!',
      open: 'Öffnen',
      copyAll: 'Alle Links kopieren',
      copiedAll: 'Alle Links kopiert!',
      copyAllHint: 'Klicken Sie, um alle Links auf einmal zu kopieren',
      copiedAllMessage: 'Alle Links kopiert! Sie können sie jetzt in Ihre Messaging-App einfügen.',
    },
    errors: {
      emptyName: 'Bitte geben Sie einen Namen ein',
      nameTooLong: 'Name ist zu lang (maximal 50 Zeichen)',
      duplicateName: 'Dieser Teilnehmer existiert bereits',
      selfAssignment: 'Ein Teilnehmer kann sich nicht selbst beschenken',
      duplicatePreAssignment: 'Diese Vorzuordnung existiert bereits',
      giverAlreadyAssigned: '{name} ist bereits als Schenker vorzugeordnet',
      receiverAlreadyAssigned: '{name} ist bereits als Beschenkter vorzugeordnet (nur gegenseitige Paare sind erlaubt)',
      generationFailed: 'Generierung der Zuordnungen fehlgeschlagen',
    },
  },
  revealPage: {
    loading: {
      title: 'Lade Ihre Zuordnung...',
      subtitle: 'Bitte warten Sie, während wir Ihre Wichtel-Enthüllung vorbereiten',
    },
    error: {
      missingData: {
        title: 'Fehlende Link-Daten',
        message: 'Dieser Link scheint unvollständig zu sein. Bitte überprüfen Sie den Link und versuchen Sie es erneut, oder kontaktieren Sie den Organisator für einen neuen Link.',
      },
      invalidLink: {
        title: 'Ungültiger Link',
        message: 'Dieser Link scheint ungültig oder unvollständig zu sein. Bitte kontaktieren Sie den Organisator für einen neuen Link.',
      },
      invalidFormat: {
        title: 'Ungültiges Link-Format',
        message: 'Dieser Link scheint unvollständig oder ungültig zu sein. Bitte kontaktieren Sie den Organisator für einen neuen Link.',
      },
      corrupted: {
        title: 'Link beschädigt',
        message: 'Dieser Link wurde beschädigt und kann nicht geöffnet werden. Bitte kontaktieren Sie den Organisator für einen neuen Link.',
      },
      cannotLoad: {
        title: 'Zuordnung kann nicht geladen werden',
        message: 'Ihre Zuordnung kann nicht geladen werden. Bitte kontaktieren Sie den Organisator für einen neuen Link.',
      },
      unexpected: {
        title: 'Unerwarteter Fehler',
        message: 'Beim Laden Ihrer Zuordnung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie den Organisator.',
      },
      tipLabel: 'Tipp:',
      tipMessage: 'Stellen Sie sicher, dass Sie den gesamten Link kopiert haben, einschließlich aller Zeichen am Ende.',
    },
    firstConfirmation: {
      question: 'Sind Sie {name}?',
      welcomeText: 'Willkommen beim Wichteln! Sie wurden zufällig jemandem zugeordnet, dem Sie ein Geschenk geben sollen.',
      secretText: 'Dies ist eine Überraschung, stellen Sie also sicher, dass Sie die einzige Person sind, die diesen Bildschirm sieht! 🤫',
      yesButton: 'Ja, das bin ich! 🎅',
      noButton: 'Nein, das bin ich nicht',
    },
    secondConfirmation: {
      question: 'Sind Sie wirklich {name}?',
      subtitle: 'Wir wollen nur sichergehen, bevor wir Ihre Wichtel-Zuordnung enthüllen!',
      yesButton: 'Ja, ich bin {name}',
      noButton: 'Nein, zurück',
    },
    reveal: {
      title: 'Sie sind Wichtel für...',
      congratulations: '🎁 Herzlichen Glückwunsch! 🎁',
      messagePrefix: 'Sie schenken ein Geschenk an',
      messageSuffix: '!',
      reminder: 'Denken Sie daran, dies geheim zu halten und über ein durchdachtes Geschenk nachzudenken. Frohe Feiertage! 🎄',
    },
  },
  common: {
    secretSanta: 'Wichteln',
    loading: 'Lädt...',
  },
}
