export interface Participant {
  id: string
  name: string
}

export interface PreAssignment {
  id: string
  giverId: string
  receiverId: string
}

export interface BlockedAssignment {
  id: string
  giverId: string
  receiverId: string
}
