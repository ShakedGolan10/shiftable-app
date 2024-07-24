'use server'

import { firestore } from "@/firebaseConfig.mjs"
import { collection, doc, DocumentData, getDoc,  } from "firebase/firestore"

export const queryOne = async <T>(docPath: string): Promise<T> => {
    try {
        const docRef = doc(firestore, docPath)
        const docData = await getDoc(docRef)
        // collection(firestore,) // Todo: Understand usage of collection reference !
        return {...docData.data(), id: docData.id} as T
    } catch (error) {
        console.log('DB_SERVICE - couldnt get user from database', error)
        throw error
    }
}

