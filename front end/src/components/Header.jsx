import React from "react";
import {
  useGetNewProductsQuery,
  useGetTopProductsQuery,
} from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/products/SmallProduct";
import ProductCarousel from "../pages/products/ProductCarousel";
import Heading from "./Heading";
import ProductCarcV2 from "./ProductCarcV2";

const Header = () => {
  // const { data, isLoading, error } = useGetTopProductsQuery();
  const { data, isLoading, error } = useGetNewProductsQuery();

  // console.log(data)

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <div className="w-full flex justify-around flex-wrap md:flex-row sm:flex-col gap-10">
        <div className="w-full flex justify-center bg-slate-800">
          <ProductCarousel />
        </div>
        <div className="">
          <Heading title="New Products" subtitle={"Explore Our New Products"} />
          <div className="w-full grid gap-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {data.map((product) => (
              <div key={product._id}>
                <ProductCarcV2 product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
