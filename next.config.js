/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config, { isServer }) => {
        // Modify stats to filter out specific warnings
        config.stats = {
            ...config.stats,
            warningsFilter: (warning) => warning.includes('selectedKeys'),
        };
        return config;
    },
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
        SERVICE_KEY: process.env.NEXT_PRIVATE_SERVICE_KEY,
        PRIVATE_KEY: process.env.NEXT_PRIVATE_KEY,
        PRIVATE_KEY_ID: process.env.NEXT_PRIVATE_KEY_ID,
        CLIENT_EMAIL: process.env.NEXT_PRIVATE_CLIENT_EMAIL,
        CLIENT_ID: process.env.NEXT_PRIVATE_CLIENT_ID,
        CLIENT_CERT_URL: process.env.NEXT_PRIVATE_CLIENT_CERT_URL
    }
}

module.exports = nextConfig
