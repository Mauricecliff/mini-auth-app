/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URI: "mongodb+srv://inpyrah:1993@cluster0.zigqral.mongodb.net/",
        TOKEN_SECRET: "nextjsauthtask"
    }
}

module.exports = nextConfig
