/** @type {import('next').NextConfig} */
// const pat

const nextConfig = {
    reactStrictMode: false,
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000', 'www.shiftable-app.com']
        }
    }
}

module.exports = nextConfig
