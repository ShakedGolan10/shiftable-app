'use client'

import { userService } from "@/services/user.service"

export class Employee {
    public id: string
    public name: string
    public email: string
    public isApplied: boolean
    public employer?: EmployerSummery
    public blockedShifts: string[]
    constructor(props: Employee) {
        this.id = props.id
        this.name = props.name
        this.email = props.email
        this.employer = props.employer
        this.isApplied = props.isApplied
        this.blockedShifts = props.blockedShifts
    }

}

export class Employer {
    public id: string
    public name: string
    public applicationTime: ApplicationTime
    public email: string
    public employerMsg?: Array<string>
    public employees: Array<string> = []
    public applicationRules? : ApplicationRules
    public weeklyWorkflow? : WeeklyWorkflow

   
    constructor(props: Employer) {
        this.id = props.id
        this.name = props.name
        this.applicationTime = props.applicationTime
        this.email = props.email
        this.employees = [...props.employees]
        this.employerMsg = props.employerMsg
        this.applicationRules = props.applicationRules
        this.weeklyWorkflow = props.weeklyWorkflow
    }

}

export const CreateUserInstance = <T>(userObject: T) => {
    if (userObject.hasOwnProperty('employees')) {
        return new Employer(userObject as Employer)
    }
    if (userObject.hasOwnProperty('employer')) {
        return new Employee(userObject as Employee)
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