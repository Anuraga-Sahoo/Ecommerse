import React, { useEffect } from 'react'
import ProgressSteps from '../../components/ProgressSteps'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import{useCreateOrderMutation} from '../../redux/api/orderApiSlice.js'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import {clearCartItems} from '../../redux/features/cart/cartSlice.js'

const PlaceOrder = () => {
    const navigate=useNavigate()
    const cart=useSelector((state)=>state.cart)

    const[createOrder,{isLoading,error}]=useCreateOrderMutation()

    useEffect(()=>{
        if(!cart.shippingAdress.address){
            navigate("/shipping")
        }
    },[cart.paymentMethod,cart.shippingAdress.address,navigate])

    const dispatch=useDispatch()
    
    const placeOrderHandler= async()=>{
        try {
            const res =  await createOrder({
                orderItems: cart.cartItems,
                shippingAdress: cart.shippingAdress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,

            }).unwrap()
            dispatch(clearCartItems())
            navigate(`/order/${res._id}`)
            
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }
  return (
    <>
       <ProgressSteps step1 step2 step3/>

       <div className=' container mx-auto mt-8'>
           {cart.cartItems===0 ?(
            <Message> Your cart is Empty</Message>
           ):(
              <div className=' overflow-x-auto'>
                  <table className=' w-full border-collapse ml-16'>
                       <thead>
                            <tr>
                                <td className=' px-1 py-2  text-left align-top font-bold text-2xl'>Image</td>
                                <td className=' px-1 py-2  text-left font-bold text-2xl '>Product</td>
                                <td className=' px-1 py-2  text-left font-bold text-2xl '>Quantity</td>
                                <td className=' px-1 py-2  text-left font-bold text-2xl '>Price</td>
                                <td className=' px-1 py-2  text-left font-bold text-2xl '>Total</td>
                            </tr>
                       </thead>
                       <tbody>
                           {cart.cartItems.map((item,index)=>(
                            <tr key={index}>
                                <td className=' p-2 '>
                                    <img 
                                        src={item.image}
                                        alt={item.name}
                                        className=' w-16 h-16 object-cover'
                                    />
                                </td>
                                <td className=' p-2'>
                                    <Link to={`/product/${item.product}`} className=' font-semibold' >
                                        {item.name}
                                    </Link>
                                </td>
                                <td className=' p-2 font-semibold'>{item.qty}</td>
                                <td className=' p-2 font-semibold'>{item.price.toFixed(2)}</td>
                                <td className=' p-2 font-semibold'>${(item.qty*item.price).toFixed(2)}</td>
                            </tr>
                           ))}
                       </tbody>
                  </table> 
              </div>
           )}

           <div className=' mt-8 ml-16'>
              <h2 className=' text-lg font-bold'>
                 Order SUmmery
              </h2>
              <div className=' flex justify-between flex-wrap p-8 bg-[#18181854]  mt-1 border rounded-md '>
                  <ul className=' text-lg font-bold'>
                      <li>
                          <span className=' font-semibold mb-4'>Items: </span>
                          ${cart.itemsPrice}
                      </li>
                      <li>
                          <span className=' font-semibold mb-4'>Shipping: </span>
                          ${cart.shippingPrice}
                      </li>
                      <li>
                          <span className=' font-semibold mb-4'>Tax: </span>
                          ${cart.taxPrice}
                      </li>
                      <li>
                          <span className=' font-semibold mb-4'>Total: </span>
                          ${cart.totalPrice}
                      </li>
                  </ul>
                  {error && <Message variant="danger">{error.data.message}</Message>}

                  <div>
                      <h2 className=' text-2xl font-semibold mb-4'> Shipping </h2>
                      <p>
                        <strong> Address: </strong>
                        {cart.shippingAdress.address},{" "}
                        {cart.shippingAdress.city},{" "}
                        {cart.shippingAdress.postalCode},{" "}
                        {cart.shippingAdress.country}
                      </p>
                  </div>
                  <div>
                     <h2 className=' text-2xl font-semibold mb-4'>
                        Payment Method
                     </h2>
                     <strong> Method:</strong>
                     <span className=' font-semibold'>{"  "}{cart.paymentMethod}</span>
                  </div>
              </div>

              <button
                 type='button'
                 disabled={cart.cartItems===0}
                 onClick={placeOrderHandler}
                 className=' bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4 '
              >
                  Place Order
              </button>
              {isLoading &&<Loader/>}
           </div>

       </div>
    </>
  )
}

export default PlaceOrder














