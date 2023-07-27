import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    userName: {
       type: String,
       required: [true, 'please provide a valid username'],
       unique: true
    },

    email: {
        type: String,
        required: [true, 'please provide a valid email'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'please provide a valid password'],
        unique: true
    },

    isVerified: {
       type: Boolean,
       default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    //forgot password and verify tokens and expiry
    ForgotPasswordToken: String,
    ForgotPaswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})


 const User = mongoose.models.users || mongoose.model('users', userSchema)

 export default User;