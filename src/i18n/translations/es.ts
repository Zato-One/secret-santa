import type { Translations } from '../types'

export const es: Translations = {
  mainPage: {
    title: 'Amigo Invisible',
    subtitle: 'Crea tus asignaciones de Amigo Invisible',
    decorations: '❄️ 🎁 ⭐ 🎁 ❄️',
    addParticipants: {
      title: 'Añadir Participantes',
      inputPlaceholder: 'Introduce el nombre del participante',
      addButton: 'Añadir Participante',
      noParticipants: '🎄 Aún no hay participantes',
      noParticipantsHint: '¡Añade tu primer participante para comenzar!',
      participantCount: 'Participantes',
      preAssignedBadge: '🎯',
    },
    preAssignments: {
      title: 'Pre-asignaciones (Opcional)',
      description: 'Especifica quién debe regalar a quién. El algoritmo respetará estas asignaciones.',
      giverLabel: 'Regalador',
      receiverLabel: 'Receptor',
      selectPlaceholder: 'Seleccionar...',
      addButton: 'Añadir Pre-asignación',
      noPreAssignments: 'Aún no hay pre-asignaciones',
      preAssignmentCount: 'Pre-asignaciones',
    },
    generate: {
      button: 'Generar Asignaciones de Amigo Invisible',
      buttonGenerating: 'Generando asignaciones...',
      buttonNeedMore: 'Se necesitan al menos 3 participantes (actualmente {count})',
      errorTitle: 'Error de Generación',
    },
    results: {
      title: '🎉 ¡Tus Asignaciones de Amigo Invisible están Listas! 🎉',
      description: 'Comparte estos enlaces con cada participante. Cada enlace revela solo la asignación de esa persona.',
      copyLink: 'Copiar Enlace',
      copied: '¡Copiado!',
      open: 'Abrir',
      copyAll: 'Copiar Todos los Enlaces',
      copiedAll: '¡Todos los Enlaces Copiados!',
      copyAllHint: 'Haz clic para copiar todos los enlaces a la vez',
      copiedAllMessage: '¡Todos los enlaces copiados! Ahora puedes pegarlos en tu aplicación de mensajería.',
    },
    errors: {
      emptyName: 'Por favor introduce un nombre',
      nameTooLong: 'El nombre es demasiado largo (máximo 50 caracteres)',
      duplicateName: 'Este participante ya existe',
      selfAssignment: 'Un participante no puede regalarse a sí mismo',
      duplicatePreAssignment: 'Esta pre-asignación ya existe',
      giverAlreadyAssigned: '{name} ya está pre-asignado como regalador',
      receiverAlreadyAssigned: '{name} ya está pre-asignado como receptor (solo se permiten pares recíprocos)',
      generationFailed: 'Error al generar las asignaciones',
    },
  },
  revealPage: {
    loading: {
      title: 'Cargando tu Asignación...',
      subtitle: 'Por favor espera mientras preparamos tu revelación de Amigo Invisible',
    },
    error: {
      missingData: {
        title: 'Datos de Enlace Faltantes',
        message: 'Este enlace parece estar incompleto. Por favor verifica el enlace e intenta de nuevo, o contacta al organizador para un nuevo enlace.',
      },
      invalidLink: {
        title: 'Enlace Inválido',
        message: 'Este enlace parece ser inválido o incompleto. Por favor contacta al organizador para un nuevo enlace.',
      },
      invalidFormat: {
        title: 'Formato de Enlace Inválido',
        message: 'Este enlace parece estar incompleto o inválido. Por favor contacta al organizador para un nuevo enlace.',
      },
      corrupted: {
        title: 'Enlace Corrupto',
        message: 'Este enlace ha sido corrompido y no puede abrirse. Por favor contacta al organizador para un nuevo enlace.',
      },
      cannotLoad: {
        title: 'No se Puede Cargar la Asignación',
        message: 'No se puede cargar tu asignación. Por favor contacta al organizador para un nuevo enlace.',
      },
      unexpected: {
        title: 'Error Inesperado',
        message: 'Algo salió mal al cargar tu asignación. Por favor intenta de nuevo o contacta al organizador.',
      },
      tipLabel: 'Consejo:',
      tipMessage: 'Asegúrate de haber copiado el enlace completo, incluyendo todos los caracteres al final.',
    },
    firstConfirmation: {
      question: '¿Eres {name}?',
      welcomeText: '¡Bienvenido al Amigo Invisible! Has sido emparejado aleatoriamente con alguien a quien debes regalar.',
      secretText: 'Esto es una sorpresa, así que ¡asegúrate de ser el único que mira esta pantalla! 🤫',
      yesButton: '¡Sí, soy yo! 🎅',
      noButton: 'No, no soy yo',
    },
    secondConfirmation: {
      question: '¿Realmente eres {name}?',
      subtitle: '¡Solo nos aseguramos antes de revelar tu asignación de Amigo Invisible!',
      yesButton: 'Sí, soy {name}',
      noButton: 'No, volver',
    },
    reveal: {
      title: 'Eres Amigo Invisible de...',
      congratulations: '🎁 ¡Felicidades! 🎁',
      messagePrefix: 'Vas a regalar a',
      messageSuffix: '!',
      reminder: '¡Recuerda mantener esto en secreto y pensar en un regalo considerado. Felices fiestas! 🎄',
    },
  },
  common: {
    secretSanta: 'Amigo Invisible',
    loading: 'Cargando...',
  },
}
