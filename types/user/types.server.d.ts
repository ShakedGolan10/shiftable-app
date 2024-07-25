export interface Employee {
    id: string
    name: string
    email: string
    employerId: string
    shifts?: Array<Shift>
    employer: EmployerSummery
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
    application_rules: Application_Rules
    weeklyWorkflow: WeeklyWorkflow
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
    optionlShifts: OptionalShifts
}

interface OptionalShifts {
    minChoices: number
    shiftsToChoose: Days[]
}
interface ApplicationTime {
    day: number
    time: string
}