import "firebase/auth";
import fetch from 'node-fetch'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { initializeApp, } from "firebase/app";

globalThis.fetch = fetch
// const serviceAccount = 'shiftable-app@shiftable-407203.iam.gserviceaccount.com'
const firebaseConfig = {
    apiKey: "AIzaSyBIqjuVmwZLLK75wJdbaXMDkIix_vhSsJw",
    authDomain: "shiftable-67b5d.firebaseapp.com",
    projectId: "shiftable-67b5d",
    storageBucket: "shiftable-67b5d.appspot.com",
    messagingSenderId: "129673392024",
    appId: "1:129673392024:web:e3aa56b3199f27143ec5ed",
};

export const app = initializeApp(firebaseConfig)
const firestore = getFirestore()
try {
    const collection1 = doc(firestore, 'shiftsRequests/Shaked')
    const c = await getDoc(collection1)
    console.log(collection1, 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', c.data()) // Yes!!!!!!!!!!!!!!!!!!!!!
} catch (error) { console.log('aaaaaaaaa -------- aaaaaa', error) }
