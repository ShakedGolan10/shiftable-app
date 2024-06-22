'use client'

import { queryClient } from "@/providers/TanstackProvider"
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
    // Todo: Make this function work with the UserContextProvider
    await fetchService.POST('auth')
}

const getLoggedInUser = async () => {
    try {
        let loggedInUser = await fetchService.GET<Employee | Employer | boolean>('user')
        if (loggedInUser) {
            // Todo: Upgrade the constructor of Employer and Employee
            return CreateUserInstance<Employee | Employer>(loggedInUser as Employee | Employer)
        } else return false

    } catch (error) {
        throw new Error('USER_SERVICE: unabled to verify if user logged in', error)
    }


}



export const userService = {
    login,
    logout,
    getLoggedInUser,
}