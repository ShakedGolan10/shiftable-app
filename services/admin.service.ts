'use client'

import { fetchService } from "./fetch.service"
import { generateJwtToken } from "./server-services/token.service"


export const updateUserCredentials = async (newCredObj: { userId: string, newCreds: { email?: string, password?: string } }) => {
    try {
        const encryptedCredentials = await generateJwtToken(newCredObj)    
        await fetchService.PUT('auth', JSON.stringify(encryptedCredentials))
        return true
    } catch (error) {
        throw new Error('USER_SERVICE: unable to login', error)
    }
}

export const updateUserData = async (userId: string, newName: string) => {
    try {
        const encryptedData = await generateJwtToken({userId, name: newName})    
        await fetchService.PUT('auth/user', JSON.stringify(encryptedData))
        return true
    } catch (error) {
        throw new Error('USER_SERVICE: unable to login', error)
    }
}