'use server'

import { firestore } from "@/firebaseConfig.mjs"
import { collection, doc, getDoc } from "firebase/firestore"

export const queryOne = async (itemId: string): Promise<any> => {
    try {
        const docRef = doc(firestore, `users/${itemId}`)
        const docData = await getDoc(docRef)
        // collection(firestore,) // Todo: Understand usage of collection reference !
        return docData.data()
    } catch (error) {
        console.log('DB_SERVICE - couldnt get user from database', error)
        throw error
    }
}

