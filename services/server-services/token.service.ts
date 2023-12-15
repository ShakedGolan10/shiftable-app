'use server'
import { User } from "firebase/auth";

export const generateIdToken = async (user: User): Promise<string> => {
    const jwtToken = await user.getIdToken()
    return jwtToken
}



