import type { Translations } from '../types'

export const cs: Translations = {
  mainPage: {
    title: 'Tajný Santa',
    subtitle: 'Vytvořte své losování Tajného Santy',
    decorations: '❄️ 🎁 ⭐ 🎁 ❄️',
    addParticipants: {
      title: 'Přidat účastníky',
      inputPlaceholder: 'Zadejte jméno účastníka',
      addButton: 'Přidat účastníka',
      noParticipants: '🎄 Zatím žádní účastníci',
      noParticipantsHint: 'Přidejte prvního účastníka, abyste mohli začít!',
      participantCount: 'Účastníci',
      preAssignedBadge: '🎯',
    },
    preAssignments: {
      title: 'Předem určená přiřazení (volitelné)',
      description: 'Určete, kdo komu má darovat. Algoritmus respektuje tato přiřazení.',
      giverLabel: 'Dárce',
      receiverLabel: 'Obdarovaný',
      selectPlaceholder: 'Vyberte...',
      addButton: 'Přidat předem určené přiřazení',
      noPreAssignments: 'Zatím žádná předem určená přiřazení',
      preAssignmentCount: 'Předem určená přiřazení',
    },
    generate: {
      button: 'Vygenerovat losování Tajného Santy',
      buttonGenerating: 'Generuji losování...',
      buttonNeedMore: 'Potřebujete alespoň 3 účastníky (aktuálně {count})',
      errorTitle: 'Chyba při generování',
    },
    results: {
      title: '🎉 Vaše losování Tajného Santy je připraveno! 🎉',
      description: 'Sdílejte tyto odkazy s každým účastníkem. Každý odkaz odhalí pouze přiřazení této osoby.',
      copyLink: 'Kopírovat odkaz',
      copied: 'Zkopírováno!',
      open: 'Otevřít',
      copyAll: 'Kopírovat všechny odkazy',
      copiedAll: 'Všechny odkazy zkopírovány!',
      copyAllHint: 'Klikněte pro zkopírování všech odkazů najednou',
      copiedAllMessage: 'Všechny odkazy zkopírovány! Nyní je můžete vložit do vaší aplikace pro zasílání zpráv.',
    },
    errors: {
      emptyName: 'Prosím zadejte jméno',
      nameTooLong: 'Jméno je příliš dlouhé (maximálně 50 znaků)',
      duplicateName: 'Tento účastník již existuje',
      selfAssignment: 'Účastník nemůže darovat sám sobě',
      duplicatePreAssignment: 'Toto předem určené přiřazení již existuje',
      giverAlreadyAssigned: '{name} již má předem určené přiřazení jako dárce',
      receiverAlreadyAssigned: '{name} již má předem určené přiřazení jako obdarovaný (jsou povoleny pouze vzájemné dvojice)',
      generationFailed: 'Nepodařilo se vygenerovat losování',
    },
  },
  revealPage: {
    loading: {
      title: 'Načítám vaše přiřazení...',
      subtitle: 'Počkejte prosím, než připravíme odhalení vašeho Tajného Santy',
    },
    error: {
      missingData: {
        title: 'Chybějící data odkazu',
        message: 'Tento odkaz se zdá být neúplný. Zkontrolujte odkaz a zkuste to znovu, nebo kontaktujte organizátora pro nový odkaz.',
      },
      invalidLink: {
        title: 'Neplatný odkaz',
        message: 'Tento odkaz se zdá být neplatný nebo neúplný. Kontaktujte prosím organizátora pro nový odkaz.',
      },
      invalidFormat: {
        title: 'Neplatný formát odkazu',
        message: 'Tento odkaz se zdá být neúplný nebo neplatný. Kontaktujte prosím organizátora pro nový odkaz.',
      },
      corrupted: {
        title: 'Poškozený odkaz',
        message: 'Tento odkaz byl poškozen a nelze jej otevřít. Kontaktujte prosím organizátora pro nový odkaz.',
      },
      cannotLoad: {
        title: 'Nelze načíst přiřazení',
        message: 'Nelze načíst vaše přiřazení. Kontaktujte prosím organizátora pro nový odkaz.',
      },
      unexpected: {
        title: 'Neočekávaná chyba',
        message: 'Něco se pokazilo při načítání vašeho přiřazení. Zkuste to prosím znovu nebo kontaktujte organizátora.',
      },
      tipLabel: 'Tip:',
      tipMessage: 'Ujistěte se, že jste zkopírovali celý odkaz včetně všech znaků na konci.',
    },
    firstConfirmation: {
      question: 'Jste {name}?',
      welcomeText: 'Vítejte v Tajném Santovi! Byli jste náhodně spárováni s někým, komu máte darovat dárek.',
      secretText: 'Toto je překvapení, takže se ujistěte, že jste jediný, kdo se na tuto obrazovku dívá! 🤫',
      yesButton: 'Ano, to jsem já! 🎅',
      noButton: 'Ne, to nejsem já',
    },
    secondConfirmation: {
      question: 'Jste opravdu {name}?',
      subtitle: 'Jen se ujišťujeme, než odhalíme vaše přiřazení Tajného Santy!',
      yesButton: 'Ano, jsem {name}',
      noButton: 'Ne, jít zpět',
    },
    reveal: {
      title: 'Jste Tajný Santa pro...',
      congratulations: '🎁 Gratulujeme! 🎁',
      messagePrefix: 'Darujete dárek pro',
      messageSuffix: '!',
      reminder: 'Nezapomeňte to udržet v tajnosti a začněte přemýšlet o promyšleném dárku. Šťastné svátky! 🎄',
    },
  },
  common: {
    secretSanta: 'Tajný Santa',
    loading: 'Načítání...',
  },
}
