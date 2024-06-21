/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    experimental: {
    },
    env: {
        JWT_SECRET: process.env.NEXT_PRIVATE_JWT_SECRET,
        FIREBASE_API_KEY: process.env.NEXT_PRIVATE_FIREBASE_APIKEY,
        AUTH_DOMAIN: process.env.NEXT_PRIVATE_FIREBASE_AUTHDOMAIN,
        PROJECT_ID: process.env.NEXT_PRIVATE_FIREBASE_PROJECTID,
        STORAGE_BUCKET: process.env.NEXT_PRIVATE_FIREBASE_STORAGEBUCKET,
        MESSAGING_SENDER_ID: process.env.NEXT_PRIVATE_FIREBASE_MESSAGINGSENDERID,
        APP_ID: process.env.NEXT_PRIVATE_FIREBASE_APPID,
    }
}

module.exports = nextConfig
