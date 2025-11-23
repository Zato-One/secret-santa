export type Participant = {
  id: string;
  name: string;
};

export type PreAssignment = {
  giverId: string;
  receiverId: string;
};

export type Assignment = {
  giver: Participant;
  receiver: Participant;
};

export type EncryptedData = {
  giver: string;
  receiver: string;
};

export type AssignmentResult = {
  participant: Participant;
  encryptedLink: string;
};

export type AssignmentError =
  | 'insufficient-participants'
  | 'impossible-assignment'
  | 'invalid-pre-assignment';

export type RevealState =
  | 'initial'
  | 'confirming'
  | 'revealed';
