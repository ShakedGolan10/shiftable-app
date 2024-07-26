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

interface WeeklyWorkflow {
    sunday: string[]
    monday: string[]
    tuesday: string[]
    wednesday: string[]
    thursday: string[]
    friday: string[]
    saturday: string[]
}

interface Application_Rules {
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