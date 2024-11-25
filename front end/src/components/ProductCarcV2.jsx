import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavouriteToLocalStorage,
  getFavouritesFromLocalStorage,
  removeFavouriteFromLocalStorage,
} from "../Utils/localStotage";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../redux/features/favorites/favoriteSlice";
import { addToCart } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

//icons
import { LiaHeart, LiaHeartSolid } from "react-icons/lia";
import { PiShoppingCart } from "react-icons/pi";

const ProductCarcV2 = ({ product }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites) || [];
  const isFavourites = favourites.some((p) => p._id === product._id);

  useEffect(() => {
    const favouritesFromLocalStorage = getFavouritesFromLocalStorage();
    dispatch(setFavorites(favouritesFromLocalStorage));
  }, []);

  const toggleFavourites = () => {
    if (isFavourites) {
      dispatch(removeFromFavorites(product));
      //remove the product from the localstorage aswell
      removeFavouriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      //add product to localstorage as well
      addFavouriteToLocalStorage(product);
    }
  };

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          className="peer absolute top-0 right-0 h-full w-full object-contain"
          src={product.image}
          alt="product image"
        />
        <div className="peer absolute top-0 -right-96 h-full w-full bg-black bg-opacity-20 object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0 flex items-center justify-center">
          <div>
            <img src="assets/click.png" alt="" width={50} height={50} />
            <p className="text-white">Click here</p>
          </div>
        </div>

        {/* <svg
          className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
          />
        </svg> */}
      </Link>
      <div className="mt-4 px-5 pb-5">
        <div className="h-20">
          <h5 className="text-xl tracking-tight text-slate-900">
            {product.name}
          </h5>
        </div>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              ₹ {product.price}
            </span>
            <span className="text-sm text-slate-900 line-through">
              {Math.ceil(product.price * 1.25)}
            </span>
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={toggleFavourites}
            className="flex items-center justify-center gap-2 rounded-md bg-transparent border-2 border-gray-700 px-5 py-2.5 text-center text-sm font-medium text-gray-700  hover:border-pink-500 hover:text-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            {isFavourites ? (
              <LiaHeartSolid size={20} />
            ) : (
              <LiaHeart size={20} />
            )}
            Favourites
          </button>
          <button
            onClick={() => addToCartHandler(product, 1)}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-slate-900 border-2 border-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <PiShoppingCart size={20} />
            <span className="block text-nowrap">Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCarcV2;
