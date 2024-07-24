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

interface Shifts {
    sunday: string
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
}
// Done: Change everywhere there is a LoggedInUser type and replace it with Class Employee


// type InitialState = {
//     loggedInUser: LoggedInUser
// }
