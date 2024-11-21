'use client'

import { fetchService } from "./fetch.service"
import { CreateUserInstance, Employee, Employer } from "@/types/class.service"
import { generateJwtToken } from "./server-services/token.service"

const login = async (credentials: Credentials): Promise<Employee | Employer> => {
    const encryptedCredentials = await generateJwtToken(credentials)
    try {
        const user = await fetchService.POST<Employee | Employer>('auth', JSON.stringify(encryptedCredentials))
        return user 
    } catch (error) {
        throw new Error('USER_SERVICE: unable to login', error)
    }
}

const logout = async () : Promise<void> => {
    try {
        await fetchService.POST('auth')
    } catch (error) {
        throw new Error('USER_SERVICE: unable to logout', error)
    }
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