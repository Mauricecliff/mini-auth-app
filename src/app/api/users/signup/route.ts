import { connect } from "@/dbconfig/dbconfig"
import { sendEmail } from "@/helpers/mailer"
import User from "@/models/userModel"

import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server"



connect();


export async function POST (request: NextRequest){
    try {
       const requestBody = await request.json()

       const {userName, email, password} = requestBody

       console.log(requestBody)

       //check if user already exist
       const existUser = await User.findOne({email})

       //return a bad response ifuser already exist
       if(existUser){
           return NextResponse.json({error: 'user already exist'}, {status: 400})
       }

       //if user doesnt exist i.e new user
       const salt = await bcryptjs.genSalt(10)
       const hashedPassword = await bcryptjs.hash(password, salt)

       //saved all info in db
       const newUser  = new User({
          userName,
          email,
          password: hashedPassword
       })

      const savedUser = await newUser.save()

      //send verification email
      await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id})

      return NextResponse.json({message: 'successfully signed up', success: true, status: 200, savedUser })
      

    }catch(error: any){

       return NextResponse.json({error: error.message}, {status: 500})
    }
}


