import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function AdminMenu() {
    const[isMenuOpen,setIsMenuOpen]=useState(false)
    const toogleMenu=()=>{
        setIsMenuOpen(!isMenuOpen)
    }
  return (
      <>
        <button
            className={`${isMenuOpen ? "top-16 right-3":"top- right-5"}  p-1 fixed rounded-lg`}
            onClick={toogleMenu}
         >
            {isMenuOpen ?(
                <FaTimes className=' bg-white mt-16 mr-3' size={24}/>
            ):(
               <>
                  {/* <div className=' w-6 h-0.5 bg-gray-200 my-1'></div>
                  <div className=' w-6 h-0.5 bg-gray-200 my-1'></div>
                  <div className=' w-6 h-0.5 bg-gray-200 my-1'></div> */}
                  <HiOutlineMenuAlt3 size={30} className=" mr-4 mt-8 font-bold"/>
               </>
            )}
        </button>
        {isMenuOpen &&(
            <section className=' bg-[#151515] p-4 fixed right-12 top-[10rem] border rounded-lg z-40'>
                <ul className=' list-none mt-2'>
                    <li>
                        <NavLink
                           to="/admin/dashboard"
                           style={({isActive})=>({
                            color:isActive?"greenyellow":"white",
                           })}
                           className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                        >
                            Admin Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                           to="/admin/categorylist"
                           style={({isActive})=>({
                            color:isActive?"greenyellow":"white",
                           })}
                           className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                        >
                            Create Category
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink
                           to="/admin/productlist"
                           style={({isActive})=>({
                            color:isActive?"greenyellow":"white",
                           })}
                           className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                        >
                            Create Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                           to="/admin/allproductslist"
                           style={({isActive})=>({
                            color:isActive?"greenyellow":"white",
                           })}
                           className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                        >
                           All Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                           to="/admin/userlist"
                           style={({isActive})=>({
                            color:isActive?"greenyellow":"white",
                           })}
                           className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                        >
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                           to="/admin/orderlist"
                           style={({isActive})=>({
                            color:isActive?"greenyellow":"white",
                           })}
                           className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                        >
                            Manage Orders
                        </NavLink>
                    </li>
                </ul>
            </section>
        )}
      </>
  )
}

export default AdminMenu


