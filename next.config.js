/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URI: "mongodb+srv://inpyrah:1993@cluster0.zigqral.mongodb.net/",
        TOKEN_SECRET: "nextjsauthtask",
        // MAILTRAP_SMTPAUTHUSER: "0d975409fe8126" ,
        // MAILTRAP_SMTPAUTHPASS: "********d7da",
        DOMAIN: "http://localhost:3000"

    }
}

module.exports = nextConfig
