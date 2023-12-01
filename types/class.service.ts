'use client'

import { userService } from "@/services/user.service"

export class EmailGenerator {
    public emailList: Array<String>

    constructor(firstname: String, lastname: String, middleName: String = null, companyName: String) {
        let firstNameFirstWord = firstname[0]
        let lastNameFirstWord = lastname[0]
        let middleNameFirstWord = (middleName) ? middleName[0] : ''
        let symbolsArray: Array<String> = ['.', '_', '-', '']
        const nameCombinationOptions = (!middleName) ? [[firstname, lastNameFirstWord], [firstNameFirstWord, lastname], [firstname, lastname]] :
            [[firstname, lastNameFirstWord], [firstNameFirstWord, lastname], [firstname, lastname],
            [firstname, middleNameFirstWord], [firstNameFirstWord, middleName], [firstname, middleName],
            [firstname, middleNameFirstWord, lastNameFirstWord], [firstname, middleNameFirstWord, lastname], [firstname, middleName, lastname], [firstname, middleNameFirstWord, lastname],
            [firstNameFirstWord, middleName, lastname], [firstNameFirstWord, middleName, lastNameFirstWord], [firstNameFirstWord, middleNameFirstWord, lastname], [firstNameFirstWord, middleNameFirstWord, lastNameFirstWord]]
        let companyPossibleDomains: Array<String> = this.getCompanyDomains(companyName) // [moonactive, moon.active, moon-active]
        this.emailList = symbolsArray.reduce((acc: Array<String>, seperator, idx): Array<String> => {
            nameCombinationOptions.forEach((option): any => {
                companyPossibleDomains.forEach(domain => {
                    if (option.length < 3) acc.push(`${option[0]}${seperator}${option[1]}@${domain}.com`)
                    else acc.push(`${option[0]}${seperator}${option[1]}${seperator}${option[2]}@${domain}.com`)
                });


            })

            return acc

        }, [])

    }

    private getCompanyDomains(companyName: String): Array<String> {
        let companyPossibleDomains = []
        if ((companyName.indexOf('-') > -1)) companyPossibleDomains = ['-']
        else if ((companyName.indexOf(' ') > -1)) companyPossibleDomains = [' ']
        if (companyPossibleDomains.length > 0) {
            let seperatorSymbolIdx: number = (companyName.indexOf(' ') > -1) ? companyName.indexOf(' ') : companyName.indexOf('-')
            return companyPossibleDomains.reduce((acc: Array<String>, item, idx) => {
                const firstWord = companyName.slice(0, seperatorSymbolIdx)
                const secondWord = companyName.slice(seperatorSymbolIdx + 1, companyName.length)
                acc.push(`${firstWord}.${secondWord}`)
                acc.push(`${firstWord}${secondWord}`)
                acc.push(`${firstWord}-${secondWord}`)

                return acc
            }, [])
        } else return [companyName]
    }


}

export class Shift {

}


export class Employee {

    public name: String
    public email: String
    public employer?: EmployerSummery
    public shifts?: Array<Shift>
    constructor(email: String, name: String, employer?: EmployerSummery) {
        // super(name, email)
        this.name = name
        this.email = email
        this.employer = employer
    }

    // Todo: methods for shifts 
    // Todo: Shift Class

}


export class Employer {
    public name: String
    public applicationDay: Number
    public email: String
    public employerMsg: Array<String>
    public employees: Array<String> = []

    constructor(name: String, applicationDay: Number, employees: Array<String>, email: String, employerMsg: Array<String>) {
        // super(name, email)
        this.name = name
        this.applicationDay = applicationDay
        this.email = email
        this.employees = [...employees],
            this.employerMsg = employerMsg
    }

}

export const CreateUserInstance = (userObject: Employee | Employer) => {
    if (userObject.hasOwnProperty('employees')) {
        const { name, applicationDay, email, employees, employerMsg } = userObject as Employer
        return new Employer(name, applicationDay, employees, email, employerMsg)
    }
    if (userObject.hasOwnProperty('employer')) {
        const { name, email, employer } = userObject as Employee
        return new Employee(email, name, employer)
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