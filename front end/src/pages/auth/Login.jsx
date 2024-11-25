import React, { useState,useEffect } from 'react'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import Loader from '../../components/Loader'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../redux/features/auth/authSlice'
import {toast} from "react-toastify"

function Login() {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const[login,{isLoading}]=useLoginMutation()

  const {search}=useLocation()
  const sp=new URLSearchParams(search)
  const redirect=sp.get("redirect")||"/"

  const {userInfo}=useSelector((state)=>state.auth)

  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{
   if(userInfo){
    navigate(redirect)
   }
  },[navigate,redirect,userInfo])

  const submitHandler=async(e)=>{
        e.preventDefault()
        try {
          const res = await login({email,password}).unwrap()
          if(res.loginSuccessful){
            dispatch(setCredentials({...res}))
            navigate(redirect)
            toast.success("Login successfully")

          } else {
            toast.error("Login failed")
          }
        } catch (err) {
          toast.error(err?.data?.message||err.error)
        }
  }

  return (
       <div>
             <section className='pl-[10rem] flex flex-wrap'>
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font-semibold mb-4">SignIn</h1>
                    <form className="container w-[40rem]" onSubmit={submitHandler}>
                      <div className="my-[2rem]">
                          <label 
                             htmlFor="email"
                             className="block text-sm font-medium text-black"
                          >
                            Email Address
                          </label>
                          <input 
                             type="email" 
                             id='email'
                             placeholder='Enter email'   
                             value={email}
                             onChange={(e)=>setEmail(e.target.value)}
                             className="mt-1 p-2 border rounded w-full"
                          />
                      </div>

                      <div className="mb-4">
                        <label 
                           htmlFor="password"
                           className='block text-sm font-medium text-black'
                        >
                          Password
                        </label>
                        <input 
                            type="password" 
                            id='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                      </div>

                      <button
                           disabled={isLoading}
                           type="submit"
                           className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                      >           
                      {isLoading ? "Signing In..." : "Sign In"}             
                      </button>
                      {isLoading && <Loader/>}
                    </form>

                    <div className="mt-4">
                        <p className=' text-black'>New Customer ? {""}
                          <Link 
                             to={redirect ? `/auth?redirect=${redirect}`:"/auth"}
                             className="text-pink-500 hover:underline"
                          >
                          Register
                          </Link>                    
                        </p>
                    </div>
                </div>
                <img
                      src="https://images.unsplash.com/photo-1616581932511-65a1392a61e6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="login page" 
                      className='h-[97vh] w-[48%]  lg: flex-row xl:block md:hidden sm:hidden rounded-lg'
                />
             </section>
       </div>
  )
}

export default Login

