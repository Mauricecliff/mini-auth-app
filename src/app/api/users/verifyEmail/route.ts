import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try {
        //send the request
        const reqBody = await request.json()

        const { token }:any = reqBody
        console.log(token)
       
        //find the verify the user by the token
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })
        
        //if user/token not found
        if(!user){
            return NextResponse.json({message: 'invalid or expired session token', status: 400})
        }
        
        console.log(user)
        //update the verifytoken, expiry and isverified
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined
       
        
        //save the verified user
        await user.save()
        
        //return a successfull response
        return NextResponse.json({message: 'verified successfully', status: 400, success: true})



    } catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}