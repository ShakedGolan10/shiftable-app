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
}


interface ApplicationTime {
    day: number
    time: string
}