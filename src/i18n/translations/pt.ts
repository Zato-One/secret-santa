import type { Translations } from '../types'

export const pt: Translations = {
  mainPage: {
    title: 'Amigo Secreto',
    subtitle: 'Crie suas atribuições de Amigo Secreto',
    decorations: '❄️ 🎁 ⭐ 🎁 ❄️',
    addParticipants: {
      title: 'Adicionar Participantes',
      inputPlaceholder: 'Digite o nome do participante',
      addButton: 'Adicionar Participante',
      noParticipants: '🎄 Nenhum participante ainda',
      noParticipantsHint: 'Adicione seu primeiro participante para começar!',
      participantCount: 'Participantes',
      preAssignedBadge: '🎯',
    },
    preAssignments: {
      title: 'Pré-atribuições (Opcional)',
      description: 'Especifique quem deve presentear quem. O algoritmo respeitará essas atribuições.',
      giverLabel: 'Presenteador',
      receiverLabel: 'Recebedor',
      selectPlaceholder: 'Selecionar...',
      addButton: 'Adicionar Pré-atribuição',
      noPreAssignments: 'Nenhuma pré-atribuição ainda',
      preAssignmentCount: 'Pré-atribuições',
    },
    generate: {
      button: 'Gerar Atribuições de Amigo Secreto',
      buttonGenerating: 'Gerando atribuições...',
      buttonNeedMore: 'São necessários pelo menos 3 participantes (atualmente {count})',
      errorTitle: 'Erro de Geração',
    },
    results: {
      title: '🎉 Suas Atribuições de Amigo Secreto estão Prontas! 🎉',
      description: 'Compartilhe estes links com cada participante. Cada link revela apenas a atribuição dessa pessoa.',
      copyLink: 'Copiar Link',
      copied: 'Copiado!',
      open: 'Abrir',
      copyAll: 'Copiar Todos os Links',
      copiedAll: 'Todos os Links Copiados!',
      copyAllHint: 'Clique para copiar todos os links de uma vez',
      copiedAllMessage: 'Todos os links copiados! Agora você pode colá-los no seu aplicativo de mensagens.',
    },
    errors: {
      emptyName: 'Por favor, digite um nome',
      nameTooLong: 'Nome muito longo (máximo 50 caracteres)',
      duplicateName: 'Este participante já existe',
      selfAssignment: 'Um participante não pode presentear a si mesmo',
      duplicatePreAssignment: 'Esta pré-atribuição já existe',
      giverAlreadyAssigned: '{name} já está pré-atribuído como presenteador',
      receiverAlreadyAssigned: '{name} já está pré-atribuído como recebedor (apenas pares recíprocos são permitidos)',
      generationFailed: 'Falha ao gerar atribuições',
    },
  },
  revealPage: {
    loading: {
      title: 'Carregando sua Atribuição...',
      subtitle: 'Por favor, aguarde enquanto preparamos sua revelação de Amigo Secreto',
    },
    error: {
      missingData: {
        title: 'Dados do Link Ausentes',
        message: 'Este link parece estar incompleto. Por favor, verifique o link e tente novamente, ou entre em contato com o organizador para um novo link.',
      },
      invalidLink: {
        title: 'Link Inválido',
        message: 'Este link parece ser inválido ou incompleto. Por favor, entre em contato com o organizador para um novo link.',
      },
      invalidFormat: {
        title: 'Formato de Link Inválido',
        message: 'Este link parece estar incompleto ou inválido. Por favor, entre em contato com o organizador para um novo link.',
      },
      corrupted: {
        title: 'Link Corrompido',
        message: 'Este link foi corrompido e não pode ser aberto. Por favor, entre em contato com o organizador para um novo link.',
      },
      cannotLoad: {
        title: 'Não é Possível Carregar a Atribuição',
        message: 'Não foi possível carregar sua atribuição. Por favor, entre em contato com o organizador para um novo link.',
      },
      unexpected: {
        title: 'Erro Inesperado',
        message: 'Algo deu errado ao carregar sua atribuição. Por favor, tente novamente ou entre em contato com o organizador.',
      },
      tipLabel: 'Dica:',
      tipMessage: 'Certifique-se de ter copiado o link inteiro, incluindo todos os caracteres no final.',
    },
    firstConfirmation: {
      question: 'Você é {name}?',
      welcomeText: 'Bem-vindo ao Amigo Secreto! Você foi aleatoriamente combinado com alguém para presentear.',
      secretText: 'Isso é uma surpresa, então certifique-se de ser o único olhando para esta tela! 🤫',
      yesButton: 'Sim, sou eu! 🎅',
      noButton: 'Não, não sou eu',
    },
    secondConfirmation: {
      question: 'Você realmente é {name}?',
      subtitle: 'Só para ter certeza antes de revelar sua atribuição de Amigo Secreto!',
      yesButton: 'Sim, eu sou {name}',
      noButton: 'Não, voltar',
    },
    reveal: {
      title: 'Você é Amigo Secreto de...',
      congratulations: '🎁 Parabéns! 🎁',
      messagePrefix: 'Você vai presentear',
      messageSuffix: '!',
      reminder: 'Lembre-se de manter isso em segredo e comece a pensar em um presente atencioso. Felizes festas! 🎄',
    },
  },
  common: {
    secretSanta: 'Amigo Secreto',
    loading: 'Carregando...',
  },
}
