import React from "react";
import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice.js";
import Product from "./Product.jsx";

const Favourites = () => {
  const favourites = useSelector(selectFavoriteProduct);
  // console.log(favourites);
  return (
    <div className="ml-[10rem] flex flex-col h-screen">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem] mb-4">
        Favourite Products
      </h1>
      {favourites.length > 0 ? (
        <>
          <div className="flex-1 flex flex-wrap">
            {favourites.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex-1 w-full flex justify-center items-center">
          <img src="public/assets/favourite_animation.gif" alt="image" />
        </div>
      )}
    </div>
  );
};

export default Favourites;
