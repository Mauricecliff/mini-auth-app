"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';





function SignupPage() {
  const router = useRouter()

   const [loading, setLoading] = useState(false)

    const [ disabledButton, setDisabledButton] = useState(true)
    
    const [user, setUser]= useState({
        email: '',
        userName: '',
        password: ''
     })

     useEffect(() => {
       if(user.email.length > 0 && user.password.length > 0 && user.userName.length > 0){
          setDisabledButton(false)
       }
     }, [user])

   const onSignUp = async (e: any) => {
      try {
        e.preventDefault()
        setLoading(true)
        const response = await axios.post('/api/users/signup', user)
        alert(response.data.message)
        router.push('/login')
        console.log(response.data)
        
      }catch(error: any){
        console.log(error.message, 'sign up failed')
      }
   
   }


  return (
    <div className="font-[Poppins] font-md capitalize text-center flex flex-col justify-center items-center min-h-screen">
         <h1 className="text-[25px]">{loading ? 'signing up please wait...' : 'sign up page'}</h1>
         <form onSubmit={onSignUp}>
            <div className='py-2'>
                <label htmlFor='username py-2'>username</label>
            </div>
            <div className='py-2'>
                <input type="text" className="p-3 rounded-lg text-black focus:outline-none" placeholder='username' onChange={(e) => setUser({...user, userName: e.target.value})} />
            </div>
            <div className='py-2'>
                <label htmlFor='username'>email</label>
            </div>
            <div className='py-2'>
                <input type="email" className="p-3 rounded-lg text-black" placeholder='@email' onChange={(e) =>  setUser({...user, email: e.target.value})}/>
            </div>
            <div className='py-2'>
                <label htmlFor='username py-2'>password</label>
            </div>
            <div className='py-2'>
                <input type="password" className="p-3 rounded-lg text-black" placeholder='password' onChange={(e) => setUser({...user, password: e.target.value})} />
            </div>
            <div className='py-2'>
                <button 
                className="bg-teal-500 p-3 px-20 rounded-lg capitalize"
                 disabled={disabledButton}
                >sign in</button>
            </div>
         </form>
          <div className='py-2'>
            <Link href="/login">login here..</Link>
         </div>
    </div>
  )
}

export default SignupPage;