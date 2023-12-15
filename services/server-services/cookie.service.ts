'use server'
import { cookies } from 'next/headers'

export const setCookie = async (name: string, data: any) => {
    const halfAnHour = 30 * 60 * 1000
    cookies().set(name, JSON.stringify(data), { expires: Date.now() + halfAnHour })
}

export const getCookie = async (name: string) => {
    const cookieStore = cookies()
    const loggedInUser = cookieStore.get(name)
    return loggedInUser
}
