import React from "react";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeFromCartHandler = (id) => {
    if(window.confirm("Are you sure")){
      dispatch(removeFromCart(id));

    }
  };
  const checkHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <section className="flex w-full items-center justify-center">
      <div className="container flex justify-around items-start  flex-wrap mx-auto mt-8">
        {cartItems == undefined || cartItems?.length === 0 ? (
          <div className="flex flex-col w-full items-center">
            <div className="capitalize text-lg font-semibold">
              your cart is empty{" "}
            </div>
            <img
              src="public/assets/LottieAnimation.gif"
              alt="image"
              height={250}
              width={250}
            />
            <Link
              to="/shop"
              className="bg-pink-500 text-white py-3 px-6 rounded-md"
            >
              Go To Shop
            </Link>
          </div>
        ) : (
          <>
            <div className=" flex flex-col w-[80%] font-poppins">
              <h1 className=" text-2xl font-semibold mb-8 hover:underline">Shopping cart</h1>
              {cartItems?.map((item) => (
                <div
                  key={item._id}
                  className=" flex items-center mb-[1rem] pb-2"
                >
                  <div className=" w-[8rem] h-[8rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className=" w-full h-full object-contain rounded"
                    />
                  </div>

                  <div className=" flex-1 ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className=" text-black  font-semibold"
                    >
                      {item.name}
                    </Link>
                    <div className=" mt-2 text-black font-medium">{item.brand}</div>
                    <div className=" mt-2 text-black font-bold">
                      ₹{item.price}
                    </div>
                  </div>

                  <div className=" w-24">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      className=" w-full p-1 border rounded text-black"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className=" text-red-500 mr-[5rem]"
                    >
                      <FaTrash className=" ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>
                </div>
              ))}

              <div className=" mt-8 w-[40rem]">
                <div className=" p-4 rounded-lg">
                  <h2 className=" text-xl font-semibold mb-2">
                    Items ({cartItems?.reduce((acc, item) => acc + item.qty, 0)}
                    )
                  </h2>

                  <div className=" text-2xl font-bold">
                    ₹{" "}
                    {cartItems
                      ?.reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                  <button
                    className=" bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg text-white w-full"
                    disabled={cartItems?.length === 0}
                    onClick={checkHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
