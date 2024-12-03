import "firebase/auth";
import fetch from "node-fetch";
import Admin from "firebase-admin";

globalThis.fetch = fetch;

const { privateKey } = JSON.parse(process.env.PRIVATE_KEY);
const firebaseAdminConfig = {
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: privateKey,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.CLIENT_CERT_URL,
    universe_domain: "googleapis.com",
};

function getOrInitializeAdminApp() {
    try {
        return Admin.app("admin");
    } catch (error) {
        return Admin.initializeApp({
            credential: Admin.credential.cert(firebaseAdminConfig),
            databaseURL: process.env.SERVICE_KEY,
        }, "admin")
    }
}

export const admin = getOrInitializeAdminApp();
