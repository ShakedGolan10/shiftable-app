import { initializeApp } from "firebase/app";
import "firebase/auth";
import fetch from 'node-fetch'

globalThis.fetch = fetch

const firebaseConfig = {
    apiKey: "AIzaSyBIqjuVmwZLLK75wJdbaXMDkIix_vhSsJw",
    authDomain: "shiftable-67b5d.firebaseapp.com",
    projectId: "shiftable-67b5d",
    storageBucket: "shiftable-67b5d.appspot.com",
    messagingSenderId: "129673392024",
    appId: "1:129673392024:web:e3aa56b3199f27143ec5ed",
};


export const app = initializeApp(firebaseConfig)