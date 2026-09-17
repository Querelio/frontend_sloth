export interface ClassInstitution {
  id: number
  name: string
}

export interface SchoolClass {
  id: number
  institutionId: number
  classLevel: string
  studentCount: number
  name: string
  institution?: ClassInstitution
}

export interface CreateClassRequest {
  institutionId: number
  classLevel: string
  studentCount: number
  name: string
}

export interface UpdateClassRequest {
  institutionId?: number
  classLevel?: string
  studentCount?: number
  name?: string
}
