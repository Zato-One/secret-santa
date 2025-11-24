export interface Participant {
  id: string;
  name: string;
}

export interface PreAssignment {
  id: string;
  giverId: string;
  receiverId: string;
}

export interface Assignment {
  giverId: string;
  receiverId: string;
  giverName: string;
  receiverName: string;
}

export interface AssignmentGraph {
  [participantId: string]: string[];
}

export interface AssignmentResult {
  success: boolean;
  assignments: Assignment[];
  error?: string;
}

export interface EncryptedAssignment {
  giverName: string;
  receiverName: string;
  language: string;
}

export interface GeneratedLink {
  participantName: string;
  revealUrl: string;
}
