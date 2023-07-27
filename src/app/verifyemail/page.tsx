"use client";

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


function VerifyEmailPage() {
  const [token, setToken]  = useState('');
  const [error, setError]  = useState(false);
  const [isVerified, setIsVerified] = useState(false);
 


  const verifyEmail = async() => {
     try {
        await axios.post('/api/users/verifyEmail', { token })
       setIsVerified(true)
     }catch(error: any){
        console.log(error.response.data)
        setError(true)
     }
  }


  //to grab the token from the url
  useEffect(()  => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || '')
  }, [])

  //to fire the function and watch the state of the token
  useEffect(() => {
    if(token.length > 0){
        verifyEmail()
    }
  }, [token])



  return (
    <div>
        <h1 className='text-center capitalize'>verification page</h1>
        <h2 className='text-center capitalize'>{token ?  `${token}` : 'no token'}</h2>
        {isVerified && (
            <div className='text-center capitalize'>
                <p>user verified</p>
                <Link href="/login">no you can login</Link>
            </div>
        )}
        {error && (
            <div className='text-center capitalize'>
                <p>user not verified</p>
            </div>
        )}
    </div>
  )
}

export default VerifyEmailPage