import React from 'react'
import { Outlet, Navigate } from 'react-router'
import { useSelector } from 'react-redux'
function PrivateRoute() {
    const{userInfo}=useSelector((state)=>state.auth)
  return (
    userInfo?<Outlet/> : <Navigate to="/auth" replace/>
  )
}

export default PrivateRoute
