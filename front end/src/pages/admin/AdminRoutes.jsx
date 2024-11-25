import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

function AdminRoutes() {
    const{userInfo}=useSelector((state)=>state.auth)
  return (
    userInfo && userInfo.isadmin
    ?(
      <Outlet/>
     )
    :(
       <Navigate to="/auth" replace/>
     )
  )
}

export default AdminRoutes

