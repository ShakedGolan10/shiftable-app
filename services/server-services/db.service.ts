'use server'

import { firestore } from "@/firebase.config.mjs"
import { collection, doc, FieldPath, getDoc, getDocs, query, QueryConstraint, updateDoc, where,  } from "firebase/firestore"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

export const queryOne = async <T>(docPath: string): Promise<T> => {
    try {
        const docRef = doc(firestore, docPath)
        const docData = await getDoc(docRef)
        return docData.data() as T
    } catch (error) {
        console.log('DB_SERVICE - couldnt get data from database', error)
        throw error
    }
}

export const queryOneField = async <T>(docPath: string, fieldPath: string): Promise<T> => { // For example: queryOneField<{email: string}>(`users/${userId}`, 'email')
    try {
        const docRef = doc(firestore, docPath)
        const docData = await getDoc(docRef)
        const value = await docData.get(fieldPath)
        return value as T
    } catch (error) {
        console.log('DB_SERVICE - couldnt get data from database', error)
        throw error
    }
}

export const queryMany = async <T>(collectionPath: string, filterBy?: Params): Promise<T[]> => { 
    try {
        const constraints: QueryConstraint[] = (filterBy) ? Object.entries(filterBy).map(
            ([field, value]) => where(field, '==', value)
        ) : []
        const collectionRef = collection(firestore, collectionPath)
        const queryRes = query(collectionRef, ...constraints)
        const querySnapshot = await getDocs(queryRes)
        
        const results: T[] = querySnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()} as T
        })
        return results
    } catch (error) {
        console.log('DB_SERVICE - couldn\'t get data from database', error)
        throw error
    }
}

export const saveOneField = async <T>(docPath: string, fieldPath: string, value: T): Promise<void> => { // For example: queryOneField<{email: string}>(`users/${userId}`, 'email')
    try {
        const docRef = doc(firestore, docPath)
        await updateDoc(docRef, {[fieldPath]: value});
    } catch (error) {
        console.log('DB_SERVICE - couldnt get data from database', error)
        throw error
    }
}