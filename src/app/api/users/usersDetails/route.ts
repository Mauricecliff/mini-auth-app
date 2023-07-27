import { connect } from "@/dbconfig/dbconfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function GET(request: NextRequest){
   try {
        //get the userId encoded by sending the request with the help of the imported helper function and the NextRequest
        const userId = await getTokenData(request);

        //send to the db and find the particular id to get the particular login user object/ details
        const user = await User.findOne({_id: userId}).select('-password')

        //return the user back to the frontend to consume
        return NextResponse.json({message: 'user found', status: 200, success: true, data:user})

   }catch(error: any){
     return NextResponse.json({error: error.message}, {status: 500})
   }
       
}