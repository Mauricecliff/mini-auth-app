import { connect } from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server"



connect();


export async function POST(request: NextRequest) {
   try {
     
    const requestBody = await request.json()
    const {email, password} = requestBody

    //check if email exist
    const existUser = await User.findOne({email});

    if(!existUser){
        return NextResponse.json({error: 'user does not exist'}, {status: 400})
    }

    //check if password match
    const verifyPassword = await bcryptjs.compare(password, existUser.password)
    if(!verifyPassword){
        return NextResponse.json({error: 'incorrect password'}, {status: 400})
    }

    //if all fine we create and get token
    const tokenData = {
        id: existUser._id,
        email: existUser.email,
        password: existUser.password
    }
    
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    const response = NextResponse.json({message: 'successfully loggin', status: 200, success: true})
     response.cookies.set("token", token, {httpOnly: true})
     return response

   }catch(error: any) {

     return NextResponse.json({error: 'login fail'}, {status: 400})

   }
}




connect();