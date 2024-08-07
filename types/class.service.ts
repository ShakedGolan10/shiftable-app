'use client'

import { userService } from "@/services/user.service"

export class Shift {

}


export class Employee {
    public id: string
    public name: string
    public email: string
    public isApplied: boolean
    public employer?: EmployerSummery
    public shifts?: Array<Shift>
    constructor(id: string, email: string, name: string, employer?: EmployerSummery) {
        this.id = id
        this.name = name
        this.email = email
        this.employer = employer
    }
    // Todo: methods for shifts
    public async setEmployeeShifts() {
        // const employeeShifts = await userService
    }



    // Todo: Shift Class

}


export class Employer {
    public id: string
    public name: string
    public applicationTime: ApplicationTime
    public email: string
    public employerMsg?: Array<string>
    public employees: Array<string> = []

    constructor(id: string, name: string, applicationTime: ApplicationTime, employees: Array<string>, email: string, employerMsg: Array<string>) {
        // super(name, email)
        this.id = id
        this.name = name
        this.applicationTime = applicationTime
        this.email = email
        this.employees = [...employees],
            this.employerMsg = employerMsg
    }

}

export const CreateUserInstance = <T>(userObject: T) => {
    if (userObject.hasOwnProperty('employees')) {
        const { id, name, applicationTime, email, employees, employerMsg = null } = userObject as Employer
        return new Employer(id, name, applicationTime, employees, email, employerMsg)
    }
    if (userObject.hasOwnProperty('employer')) {
        const { id, name, email, employer } = userObject as Employee
        return new Employee(id, email, name, employer)
    }
}



// function fibonacci(n) {
//     if (n === 0) {
//         // console.log(n)
//         return 0;
//     } else if (n === 1) {
//         // console.log(n)
//         return 1;
//     } else {
//         return fibonacci(n - 1) + fibonacci(n - 2);
//     }
// }

// console.log(fibonacci(21))