import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

//icons
import { LiaHeart, LiaHeartSolid } from "react-icons/lia";
import { PiShoppingCart } from "react-icons/pi";

import ProductCard from "../../components/ProductCard";
import Ratings from "./Ratings";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetRecommendedProductsQuery,
} from "../../redux/api/productApiSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavouriteToLocalStorage,
  getFavouritesFromLocalStorage,
  removeFavouriteFromLocalStorage,
} from "../../Utils/localStotage";
import ReviewSection from "../../components/ReviewSection";
import { animateScroll as scroll } from "react-scroll";
import Loader from "../../components/Loader";

const ProductDetailsV2 = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { data: recommendedProducts, isLoading: loadingRecommendedProducts } =
    useGetRecommendedProductsQuery(productId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const favourites = useSelector((state) => state.favourites) || [];

  const isFavourites = favourites.some((p) => p._id === product._id);
  const [reviewEvent, setReviewEvent] = useState(false);
  const [loadingNavigation, setLoadingNavigation] = useState(false);

  useEffect(() => {
    const favouritesFromLocalStorage = getFavouritesFromLocalStorage();
    dispatch(setFavorites(favouritesFromLocalStorage));
  }, []);

  useEffect(() => {
    refetch();
    setReviewEvent(false);
  }, [reviewEvent]);

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

  const handleNavigation = (path) => {
    setLoadingNavigation(true);
    setTimeout(() => {
      navigate(path);
      setLoadingNavigation(false);

      // Smooth scroll animation to top
      scroll.scrollToTop({
        duration: 1000,
        smooth: "easeInOutQuart",
        offset: -100,
      });
    }, 1000);
  };

  

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <section className="w-full px-[5%] flex flex-col gap-10">
        <div className="w-full grid md:grid-cols-2 grid-cols-1">
          <div className="flex w-full items-center justify-center">
            <img
              src={product?.image}
              alt={product?.name}
              className="w-[335px] h-[416px] object-contain"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <h1 className="font-extrabold text-4xl pr-20">{product?.name}</h1>
              <p className="text-gray-800 font-bold">Brand: {product?.brand}</p>
              <Ratings value={product?.rating} />
            </div>
            <p className="font-normal font-sans text-gray-700">
              {product?.description}
            </p>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-2xl">
                ₹ {product?.price.toLocaleString("en-IN")}
              </h3>
              <div className="w-full flex justify-between flex-wrap">
                <p className="text-gray-800 font-poppins">
                  In Stock: {product?.countInStock}
                </p>
                <p className="text-gray-800 font-poppins">
                  Rating: {product?.rating}
                </p>
                <p className="text-gray-800 font-poppins">
                  Added: {moment(product?.createAt).format("Do MMM YYYY")}{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 ">
              <button
                onClick={toggleFavourites}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-transparent border-2 border-gray-700 px-5 py-2.5 text-center text-sm font-medium text-gray-700  hover:border-pink-500 hover:text-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300"
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

        <ReviewSection
          product={product}
          productId={productId}
          userInfo={userInfo}
          reviewEvent={() => setReviewEvent(true)}
        />

        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">Recommended Products</h1>
          <div className="">
            {loadingRecommendedProducts ? (
              <p>Loading...</p>
            ) : (
              <div className="grid md:grid-cols-4 grid-cols-3">
                {recommendedProducts?.length ? (
                  recommendedProducts?.map((product) => (
                    <ProductCard
                      product={product}
                      navigate={(path) => handleNavigation(path)}
                    />
                  ))
                ) : (
                  <p className="text-semibold font-sans w-full">
                    No related products available right now
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        {loadingNavigation && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-40">
          <Loader />
        </div>
      )}
      </section>
    </>
  );
};

export default ProductDetailsV2;
