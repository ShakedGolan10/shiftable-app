import "firebase/auth";
import fetch from 'node-fetch'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { initializeApp, } from "firebase/app";

globalThis.fetch = fetch


// const serviceAccount = 'shiftable-app@shiftable-407203.iam.gserviceaccount.com'
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore()

// In the proccess: build db.service 
