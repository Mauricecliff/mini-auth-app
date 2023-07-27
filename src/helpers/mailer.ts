import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        //create an hash token using bycryptjs for our password and email verification
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        
        //update verify token and expiry && forgot password token and expiry if user wants to verify email || password
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })

        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {
                ForgotPasswordToken: hashedToken,
                ForgotPaswordExpiry: Date.now() + 3600000
            })
        }
        
        //create a transporter to send the mail using the mailtrap values
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "e3be36239029cd",
              pass: "faa2a8c9c8dfc8"
            }
          });
        
        //create your mail options
        const mailOptions = {
            from: 'coderzden2023@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password',
            html: `
            <p>
              Click
              <a href="${process.env.DOMAIN}/verifyemail?=${hashedToken}">here</a>
              ${emailType === 'VERIFY'? 'please click the link to verify your email address' : 'please click the link to reset your password'}
            </p>`

        }

        //send the the transporter object and pass the mail option as an arguement to user email address
        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse

        

    }catch(error: any){
        throw new Error(error.message)
    }
}

