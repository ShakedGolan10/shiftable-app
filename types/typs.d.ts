'use client'

interface Credentials {
    email: string,
    password: string
}

interface EmployerSummery {
    name: String
    applicationTime?: ApplicationTime
    employerMsg?: Array<String>
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

// type LoggedInUser = {
//     name: string,
//     isAdmin: boolean
// }



class ReturnTypeDeterminer<T> {
    private result: T | undefined


    constructor(result: T) {
        this.result = result
    }
}


