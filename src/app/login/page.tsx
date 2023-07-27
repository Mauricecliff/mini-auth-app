"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';







function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
     const [ disabledButton, setDisabledButton] = useState(true)

  const [user, setUser]= useState({
     email: '',
     password: ''
  })

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 ){
       setDisabledButton(false)
    }
  }, [user])

  const onLogin = async (e: any) => {
    try {
      e.preventDefault()
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      alert(response.data.message)
      router.push('/profile')
      console.log(response.data)
      
    }catch(error: any){
      console.log(error.message, 'sign up failed')
    }
 
 }


  return (
    <div className="font-[Poppins] font-md capitalize text-center flex flex-col justify-center items-center min-h-screen">
         <h1 className="text-[25px]">{loading ? 'processing loggin wait a minute...': 'loggin here...'}</h1>
         <form onSubmit={onLogin}>
            <div className='py-2'>
                <label htmlFor='username' >email</label>
            </div>
            <div className='py-2'>
                <input type="email" 
                     className="p-3 rounded-lg text-black" 
                     placeholder='@email' onChange={(e) => setUser({...user, email: e.target.value})}
                     />
            </div>
            <div className='py-2'>
                <label htmlFor='username py-2'>password</label>
            </div>
            <div className='py-2'>
                <input type="password" className="p-3 rounded-lg text-black" placeholder='password' onChange={(e) => setUser({...user, password: e.target.value})} />
            </div>
            <div className='py-2'>
            <button disabled={disabledButton}
             className="bg-teal-500 p-3 px-20 rounded-lg capitalize ">loggin</button>
            </div>
         </form>
         <div className='py-2'>
                <Link href="/signup">sign up here..</Link>
         </div>
    </div>
  )
}

export default LoginPage;