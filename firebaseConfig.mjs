import "firebase/auth";
import fetch, { Request } from 'node-fetch'
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
// const url = 'https://joni-b1a26-default-rtdb.europe-west1.firebasedatabase.app//JONI/send.json'
// const request = new Request(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: 972544777605, text: 'אתה סופר סופר גיי' }) })
// await fetch(request)

