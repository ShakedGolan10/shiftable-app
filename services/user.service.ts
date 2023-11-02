'use client'

import { queryClient } from "@/components/TanstackProvider"
import { fetchService } from "./fetch.service"


const login = async (credentials: Credentials): Promise<LoggedInUser> => {
    try {
        const user = await fetchService.POST<LoggedInUser>('auth', credentials)
        return user
    } catch (error) {
        throw new Error('unable to login - user service')
    }

}

const logout = () => {
    return { name: '', isAdmin: false }
}

const getLoggedInUser = async (): Promise<LoggedInUser | boolean> => {
    try {
        let loggedInUser = await fetchService.GET('user', '')
        if (loggedInUser) return loggedInUser
        else return false
    } catch (error) {
        throw new Error('unable to get user from server - user isnt loggedIn')
    }


}

const getEmptyUser = (): LoggedInUser => {
    return { name: '', isAdmin: false }
}


export const userService = {
    login,
    logout,
    getLoggedInUser,
    getEmptyUser
}