"use client";

// import { outPutUserDetails } from '@/helpers/outPutUserDetails';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'



function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [user, setUser] = useState({})
  const [userId, setUserId] = useState('')
  const router = useRouter()
    const onLogOut = async() => {
        try {
          setLoading(true)
          const response = await axios.get('/api/users/logout')
          alert(response.data.message)
          router.push('/login')
          console.log(response.data)
          
          
        }catch(error: any) {
          console.log(error.message)
        }finally {
          setLoading(false)
        }
    }
    
    const outPutUsersDetails = async() => {
        try {

          const response = await axios.get('/api/users/usersDetails')
          console.log(response.data)
          setUserName(response.data.data.userName)
          setUser(response.data.data)
          setUserId(response.data.data._id)
          alert(response.data.message)
        }catch(error: any){
          console.log(error.message)
        }
    }
   
    useEffect(() => {
       outPutUsersDetails()
    }, [])
  return (
    <div className="font-[Poppins] font-md capitalize text-center flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-[25px]">ProfilePage</h1>
         <h2>welcome {username}</h2>
        <p>{loading ? 'logging out now...' : 'you are successfully logged in'}</p>
        
        <button onClick={onLogOut} className="bg-red-600 p-5 rounded-lg uppercase">logout</button>
        <Link className='text-white ' href={`/profile/${userId}`}>view</Link>
       
    </div>
  )
}

export default ProfilePage