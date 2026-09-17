export interface ContractInstitution {
  id: number
  name: string
}

export interface PricingMode {
  id: number
  name: string
}

export interface ContractTeacher {
  id: number
  firstName: string
  lastName: string
  email: string
}

export interface Contract {
  id: number
  institutionId: number
  pricingModeId: number
  contractNumber: string
  startDate: string
  endDate: string
  hourlyVolumePlanned: string
  unitPrice: string
  institution?: ContractInstitution
  pricingMode?: PricingMode
  teacher?: ContractTeacher
}

export interface CreateContractRequest {
  institutionId: number
  pricingModeId: number
  contractNumber: string
  startDate: string
  endDate: string
  hourlyVolumePlanned: number
  unitPrice: number
}

export interface UpdateContractRequest {
  institutionId?: number
  pricingModeId?: number
  contractNumber?: string
  startDate?: string
  endDate?: string
  hourlyVolumePlanned?: number
  unitPrice?: number
}
