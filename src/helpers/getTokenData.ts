import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';


export const getTokenData = (request: NextRequest) => {
  try {
   
    //get the encoded token from the client
    const token = request.cookies.get('token')?.value || '';

    //decode the token inother to identify the particular token in the db
    const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)


    //return the decoded token inside this helper function
    return decodedToken.id



  }catch(error: any) {
     throw new Error(error)
  }
}