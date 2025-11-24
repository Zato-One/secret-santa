import type {
  Participant,
  PreAssignment,
  Assignment,
  AssignmentResult,
} from '../types/assignment';

export function generateAssignments(
  participants: Participant[],
  preAssignments: PreAssignment[] = []
): AssignmentResult {
  if (participants.length < 3) {
    return {
      success: false,
      assignments: [],
      error: 'You need at least 3 participants',
    };
  }

  const maxRetries = 20;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = attemptGeneration(participants, preAssignments);
    if (result.success) {
      return result;
    }
  }

  return {
    success: false,
    assignments: [],
    error: 'Could not generate valid assignments after multiple attempts. Try removing some pre-assignments.',
  };
}

function attemptGeneration(
  participants: Participant[],
  preAssignments: PreAssignment[]
): AssignmentResult {
  const assignments: Assignment[] = [];
  const assignedReceivers = new Set<string>();
  const assignedGivers = new Set<string>();

  for (const preAssign of preAssignments) {
    assignedReceivers.add(preAssign.receiverId);
    assignedGivers.add(preAssign.giverId);
  }

  const giverToReceiver = new Map<string, string>();

  for (const preAssign of preAssignments) {
    giverToReceiver.set(preAssign.giverId, preAssign.receiverId);
  }

  const unassignedGivers = participants.filter(
    (p) => !assignedGivers.has(p.id)
  );

  const shuffled = [...unassignedGivers].sort(() => Math.random() - 0.5);

  for (const giver of shuffled) {
    const validReceivers = participants.filter((receiver) => {
      if (receiver.id === giver.id) return false;
      if (assignedReceivers.has(receiver.id)) return false;

      const wouldCreateReciprocal =
        giverToReceiver.get(receiver.id) === giver.id;
      if (wouldCreateReciprocal) return false;

      return true;
    });

    if (validReceivers.length === 0) {
      return {
        success: false,
        assignments: [],
        error: 'No valid receivers available',
      };
    }

    const receiver =
      validReceivers[Math.floor(Math.random() * validReceivers.length)];

    giverToReceiver.set(giver.id, receiver.id);
    assignedReceivers.add(receiver.id);
  }

  for (const [giverId, receiverId] of giverToReceiver) {
    const giver = participants.find((p) => p.id === giverId);
    const receiver = participants.find((p) => p.id === receiverId);

    if (giver && receiver) {
      assignments.push({
        giverId: giver.id,
        receiverId: receiver.id,
        giverName: giver.name,
        receiverName: receiver.name,
      });
    }
  }

  const validationError = validateAssignments(
    assignments,
    participants,
    preAssignments
  );
  if (validationError) {
    return {
      success: false,
      assignments: [],
      error: validationError,
    };
  }

  return {
    success: true,
    assignments,
  };
}

function validateAssignments(
  assignments: Assignment[],
  participants: Participant[],
  preAssignments: PreAssignment[]
): string | null {
  if (assignments.length !== participants.length) {
    return 'Not all participants have assignments';
  }

  const givers = new Set(assignments.map((a) => a.giverId));
  const receivers = new Set(assignments.map((a) => a.receiverId));

  if (givers.size !== participants.length) {
    return 'Some participants are not givers';
  }

  if (receivers.size !== participants.length) {
    return 'Some participants are not receivers';
  }

  for (const assignment of assignments) {
    if (assignment.giverId === assignment.receiverId) {
      return `Self-assignment detected: ${assignment.giverName}`;
    }
  }

  const assignmentMap = new Map(
    assignments.map((a) => [a.giverId, a.receiverId])
  );

  for (const assignment of assignments) {
    const reverseAssignment = assignmentMap.get(assignment.receiverId);
    if (reverseAssignment === assignment.giverId) {
      return `Reciprocal pair detected: ${assignment.giverName} ↔ ${assignment.receiverName}`;
    }
  }

  for (const preAssign of preAssignments) {
    const actualReceiver = assignmentMap.get(preAssign.giverId);
    if (actualReceiver !== preAssign.receiverId) {
      return `Pre-assignment not respected: ${preAssign.giverId} should give to ${preAssign.receiverId}`;
    }
  }

  return null;
}
