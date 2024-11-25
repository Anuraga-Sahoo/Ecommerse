import React, { useEffect, useState } from 'react'
import{
   saveShippingAddress,
   savePaymentMethod
} from "../../redux/features/cart/cartSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProgressSteps from '../../components/ProgressSteps'
const Shipping = () => {
    const cart=useSelector((state)=>state.cart)
    const{shippingAdress}=cart

    const[paymentmethod,setPaymentMethod]=useState("PayPal")
    const[address,setAddress]=useState(shippingAdress.address || "")
    const[city,setCity]=useState(shippingAdress.city||"")
    const[postalCode,setPostalCode]=useState(shippingAdress.postalCode||"")
    const[country,setCountry]=useState(shippingAdress.country||"")
    
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const submitHandler=(e)=>{
        e.preventDefault()

        dispatch(saveShippingAddress({address,city,postalCode,country}))
        dispatch(savePaymentMethod(paymentmethod))
        navigate("/placeorder")
    }
       //payment
    useEffect(()=>{
        if(!shippingAdress.address){
            navigate("/shipping")
        }
    },[navigate,shippingAdress])

  return (
    <div className=' container mx-auto mt-10'>
        <ProgressSteps  step1 step2/>
        <div className=' mt-[10rem] flex justify-around items-center flex-wrap'>
            <form  onSubmit={submitHandler} className=' w-[40rem]'>
                <h1 className=' text-3xl font-bold mb-4'>
                    Shipping
                </h1>
                <div className=' mb-4'>
                    <label 
                         htmlFor="address"
                         className=' block text-black mb-2'
                    >
                        Address
                    </label>
                    <input 
                         type="text" 
                         placeholder='Enter address'
                         required
                         value={address}
                         onChange={(e)=>setAddress(e.target.value)}
                         className=' w-full p-2 border rounded'
                    />
                </div>
                <div>
                    <label 
                            htmlFor="address"
                            className=' block text-black mb-2'
                        >
                            City
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter city'
                            required
                            value={city}
                            onChange={(e)=>setCity(e.target.value)}
                            className=' w-full p-2 border rounded'
                        />
                </div>
                <div>
                    <label 
                            htmlFor="address"
                            className=' block text-black mb-2'
                        >
                            Postal Code
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter postal code'
                            required
                            value={postalCode}
                            onChange={(e)=>setPostalCode(e.target.value)}
                            className=' w-full p-2 border rounded'
                        />
                </div>
                <div>
                    <label 
                            htmlFor="address"
                            className=' block text-black mb-2'
                        >
                            Country
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter country'
                            required
                            value={country}
                            onChange={(e)=>setCountry(e.target.value)}
                            className=' w-full p-2 border rounded'
                        />
                </div>
                <div className=' mb-4'>
                   <label 
                        htmlFor=" payment "
                        className=' block font-bold '
                    >
                        Select Method
                   </label>
                   <div className=' mt-2'>
                       <label 
                           htmlFor="select payment option"
                           className=' inline-flex items-center'
                        >
                              <input 
                             type="radio"
                             name='paymentMethod'
                             value='Paypal'
                             checked={paymentmethod==='PayPal'}
                             onChange={(e)=>setPaymentMethod(e.target.value)} 
                             />
                             <span className=' ml-2'>PayPal or Credit Card</span>
                        </label>
                   </div>
                </div>

                <button className=' bg-pink-500 text-black font-semibold py-2 px-4 rounded-full text-lg w-full'
                          type='submit'
                >
                    Continue
                </button>
            </form>
        </div>
    </div>
  )
}

export default Shipping



