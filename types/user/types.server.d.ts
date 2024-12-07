export interface Employee {
    id: string
    name: string
    email: string
    employerId: string
    shifts?: Array<Shift>
    employer: EmployerSummery
    blockedShifts:string[]
    isApplied: boolean
}

interface Credentials {
    email: string,
    password: string
}

export interface EmployerSummery {
    id: string
    name: string
    applicationTime?: ApplicationTime
    employerMsg?: Array<string>
}

export interface Employer {
    id: string
    name: string
    applicationTime: ApplicationTime
    email: string
    employerMsg?: Array<string>
    employees: Array<string> = []
    applicationRules: ApplicationRules
    weeklyWorkflow: WeeklyShifts
}


interface Days {
    sunday?: string
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
}

interface ShiftSlot {
    shift: string
    shiftId: string
}

interface WeeklyShifts {
    sunday: ShiftSlot[]
    monday: ShiftSlot[]
    tuesday: ShiftSlot[]
    wednesday: ShiftSlot[]
    thursday: ShiftSlot[]
    friday: ShiftSlot[]
    saturday: ShiftSlot[]
}

export interface TableShifts {
    sunday: Shift[]
    monday: Shift[]
    tuesday: Shift[]
    wednesday: Shift[]
    thursday: Shift[]
    friday: Shift[]
    saturday: Shift[]
}

export interface DayOrientedObject<T> {
    sunday: {
      [key: string]: T
    }
    monday: {
      [key: string]: T
    }
    tuesday: {
      [key: string]: T
    }
    wednesday: {
      [key: string]: T
    }
    thursday: {
      [key: string]: T
    }
    friday: {
      [key: string]: T
    }
    saturday: {
      [key: string]: T
    }
  }

interface ApplicationRules {
    mandatoryShifts: Days | undefined
    minDays: number
    numOfCant: number
    optionalShifts: OptionalShifts[]
}

interface OptionalShifts {
    minChoices: number
    shiftsToChoose: Days
}
interface ApplicationTime {
    day: number
    time: string
}

export interface Shift {
    shift: string
    shiftId: string
    isSelected: boolean
    isCant: boolean
    name?: string
    employeeId?: string
  }

  export interface RowItem {
    key: string 
    shifts: Shift[] 
  }
  
  export interface ShiftReqsOOP {
    [key: string]: {
      id: string
      name: string
      shifts: TableShifts
  }
}
  export interface ShiftReqs {
      id: string
      shifts: TableShifts
}
