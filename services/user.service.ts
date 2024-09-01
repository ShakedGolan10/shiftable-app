'use client'

import { fetchService } from "./fetch.service"
import { CreateUserInstance, Employee, Employer } from "@/types/class.service"

// Todo: Change everywhere there is a Employee type and replace it with Class Employee


const login = async (credentials: Credentials): Promise<Employee | Employer> => {
    try {
        const user = await fetchService.POST<Employee | Employer>('auth', credentials)
        return user
    } catch (error) {
        throw new Error('USER_SERVICE: unable to login', error)
    }

}

const logout = async () : Promise<void> => {
    await fetchService.POST('auth')
}

const getLoggedInUser = async () => {
    try {
        let loggedInUser = await fetchService.GET<Employee | Employer>('auth')
        if (loggedInUser) {
            return CreateUserInstance<Employee | Employer>(loggedInUser)
        } else throw new Error('USER_SERVICE: unabled to verify if user logged in')
    } catch (error) {
        throw new Error('USER_SERVICE: unabled to verify if user logged in')
    }
}



export const userService = {
    login,
    logout,
    getLoggedInUser,
}