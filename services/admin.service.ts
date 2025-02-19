'use client'

import { Employee, Employer } from "@/types/class.service"
import { fetchService } from "./fetch.service"
import { generateJwtToken } from "./server-services/token.service"


export const updateUserCredentials = async (newCredObj: { userId: string, newCreds: { email?: string, password?: string } }) => {
    try {
        const encryptedCredentials = await generateJwtToken(newCredObj)    
        await fetchService.PUT('auth', JSON.stringify(encryptedCredentials))
        return true
    } catch (error) {
        console.log({error})
        throw new Error('AMDIN_SERVICE: unable to perform action', error)
    }
}

export const updateUserData = async (userId: string, newName: string) => {
    try {
        const encryptedData = await generateJwtToken({userId, name: newName})    
        await fetchService.PUT('auth/user', JSON.stringify(encryptedData))
        return true
    } catch (error) {
        console.log({error})
        throw new Error('AMDIN_SERVICE: unable to perform action', error)
    }
}

export const createNewEmployee = async (name: string, email: string, password: string, employerId: string): Promise<Employee> => {
    try {
        const encryptedData = await generateJwtToken({name, email, password, employerId})    
        const newUser = await fetchService.POST('auth/user', JSON.stringify(encryptedData))
        return newUser as Employee
    } catch (error) {
        console.log({error})
        throw new Error('AMDIN_SERVICE: unable to perform action', error)
    }
}

export const createNewEmployer = async (name: string, email: string, password: string): Promise<Employer> => {
    try {
        const encryptedData = await generateJwtToken({name, email, password})    
        const newUser = await fetchService.POST('auth/user', JSON.stringify(encryptedData))
        return newUser as Employer
    } catch (error) {
        console.log({error})
        throw new Error('AMDIN_SERVICE: unable to perform action', error)
    }
}