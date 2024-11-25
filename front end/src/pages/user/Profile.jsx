import React, { useEffect, useState } from 'react'
import {useProfileMutation} from '../../redux/api/usersApiSlice'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import{setCredentials} from '../../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

function Profile() {
    const[username,setUserName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')

    const[updateProfile,{isLoading:loadingUpdateProfile}]=useProfileMutation()

    const{userInfo}=useSelector((state)=>state.auth)

    useEffect(()=>{
        setUserName(userInfo.username)
        setEmail(userInfo.email)
    },[userInfo.email,userInfo.username])

    const dispatch=useDispatch()

    const submitHandler=async(e)=>{
        e.preventDefault()
        if(password !==confirmPassword){
            toast.error("password do not match")
        }else{
            try {
                const res=await updateProfile({
                    _id:userInfo._id,
                    username,
                    email,
                    password,
                }).unwrap()
                dispatch(setCredentials({...res}))
                toast.success("profile updated successfully")
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
            <div className="md:w-1/3">
               <div className=' w-full flex flex-row justify-center'>
                   <button className=' text-2xl font-semibold mb-4  flex justify-center border border-blue-200 py-1 pl-2 pr-2 rounded-lg bg-purple-100 hover:bg-pink-200  hover:scale-105 transition-all ease-in-out duration-300'>
                       Update Profile
                   </button>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label 
                            htmlFor="name"
                            className="block text-black mb-2"
                        >
                            Name
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter Your name'
                            className=' form-input border   p-4 rounded-md w-full'
                            value={username}
                            onChange={(e)=>setUserName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label 
                            htmlFor="email"
                            className="block text-black mb-2"
                        >
                            Email
                        </label>
                        <input 
                            type="email" 
                            placeholder='Enter Your email'
                            className=' form-input border  p-4 rounded-md w-full'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>

                    
                    <div className="mb-4">
                        <label 
                            htmlFor="password"
                            className="block text-black mb-2"
                        >
                            Password
                        </label>
                        <input 
                            type="password" 
                            placeholder='Enter Your password'
                            className=' form-input border  p-4 rounded-md w-full'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label 
                            htmlFor="password"
                            className="block text-black mb-2"
                        >
                            Confirm Password
                        </label>
                        <input 
                            type="password" 
                            placeholder='Confirm password'
                            className=' form-input border  p-4 rounded-md w-full'
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className=' flex justify-between'>
                        <button
                            type="submit"
                            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                        >
                            Update
                        </button>
                        <Link
                           to="/user-orders"
                           className='bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700'
                        >
                            My Orders
                        </Link>
                    </div>
                    {loadingUpdateProfile && <Loader/>}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Profile

