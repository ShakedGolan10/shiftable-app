'use server'
import { cookies } from 'next/headers'

export const setCookie = async (name: string, data: any) => {
    try {
        const halfAnHour = 30 * 60 * 1000
        cookies().set(name, JSON.stringify(data), { expires: Date.now() + halfAnHour, httpOnly: false, sameSite: false })
    } catch (error) {
        console.log(error)
        throw new Error('cookie-service: Could\'nt set cookie')
    }
}

export const getCookie = async (name: string): Promise<string | boolean> => {
    try {
        console.log('at getCookie')
        const cookieStore = cookies()
        const loggedInUser = cookieStore.get(name)
        console.log('the loggedin user cookie -->', loggedInUser)
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
        throw new Error('cookie-service: Could\'nt get cookie')
    }
}


