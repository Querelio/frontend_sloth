export interface SessionClassInstitution {
  id: number
  color: string
}

export interface SessionClass {
  id: number
  name: string
  classLevel: string
  institution?: SessionClassInstitution | null
}

export interface SessionContract {
  id: number
  contractNumber: string
}

export interface SessionStatus {
  id: number
  name: string
}

export interface SessionTeacher {
  id: number
  firstName: string
  lastName: string
  email: string
}

export interface Session {
  id: number
  subject: string | null
  classId: number | null
  title: string
  contractId: number | null
  statusId?: number | null
  teacherId: number | null
  invoiceId: number | null
  date: string
  start: string
  end: string
  declarationReference: string | null
  declarationDate: string | null
  color?: string
  class?: SessionClass | null
  contract?: SessionContract | null
  statusRelation?: SessionStatus | null
  teacher?: SessionTeacher | null
}

export interface CreateSessionRequest {
  title: string
  date: string
  start: string
  end: string
  subject?: string
  classId?: number
  contractId?: number
  declarationReference?: string
}

export interface UpdateSessionRequest {
  title?: string
  date?: string
  start?: string
  end?: string
  subject?: string
  classId?: number
  contractId?: number
  declarationReference?: string
}
