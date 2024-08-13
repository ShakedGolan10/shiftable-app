'use client'

interface Credentials {
    email: string,
    password: string
}

interface EmployerSummery {
    id: string
    name: string
    applicationTime?: ApplicationTime
    employerMsg?: Array<string>
}

interface ApplicationTime {
    day: number
    time: string
}

interface ShiftSlot {
    shift: string
    shiftId: string
}

interface WeeklyWorkflow {
    sunday: ShiftSlot[]
    monday: ShiftSlot[]
    tuesday: ShiftSlot[]
    wednesday: ShiftSlot[]
    thursday: ShiftSlot[]
    friday: ShiftSlot[]
    saturday: ShiftSlot[]
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
interface Days {
    sunday?: string
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
}