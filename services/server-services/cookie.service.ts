'use server'
import { cookies } from 'next/headers'

export const setCookie = async (name: string, data: any) => {
    try {
        const halfAnHour = 30 * 60 * 1000
        cookies().set(name, JSON.stringify(data), { expires: (Date.now() + halfAnHour), secure: process.env.NODE_ENV === 'production' })
    } catch (error) {
        console.log(error)
        throw new Error('cookie-service: Could\'nt set cookie')
    }
}

export const getCookie = async (name: string): Promise<string | boolean> => {
    try {
        const cookieStore = cookies()
        const loggedInUser = cookieStore.get(name)
        if (loggedInUser) return JSON.parse(loggedInUser.value)
        else return false
    } catch (error) {
        console.log(error)
        throw new Error('cookie-service: Could\'nt get cookie')
    }
}

export const clearCookie = async (key: string): Promise<void> => {
    try {
        cookies().delete(key)
    } catch (error) {
        console.log(error)
        throw new Error('cookie-service: Could\'nt clear cookie')
    }
}


