'use server'

import { firestore } from "@/firebaseConfig.mjs"
import { doc, FieldPath, getDoc,  } from "firebase/firestore"

export const queryOne = async <T>(docPath: string): Promise<T> => {
    try {
        const docRef = doc(firestore, docPath)
        const docData = await getDoc(docRef)
        return {...docData.data()} as T
    } catch (error) {
        console.log('DB_SERVICE - couldnt get user from database', error)
        throw error
    }
}

export const queryOneField = async <T>(docPath: string, fieldPath: string): Promise<T> => { // For example: queryOneField<{email: string}>(`users/${userId}`, 'email')
    try {
        const docRef = doc(firestore, docPath)
        const docData = await getDoc(docRef)
        const value: T = await docData.get(fieldPath)
        return value
    } catch (error) {
        console.log('DB_SERVICE - couldnt get user from database', error)
        throw error
    }
}