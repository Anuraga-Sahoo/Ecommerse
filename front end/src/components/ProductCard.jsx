import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product,  navigate}) => {

  return (
    <div className="mb-10">
      <div className="place-items-center">
        {/* card section */}
        <div
          data-aos="fade-up"
          data-aos-delay={product?.aosDelay}
          className="group"
          key={product.id}
        >
          <div className="relative transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300">
            <img
              src={product.image}
              alt={product.name}
              className="h-[180px] w-[260px] object-contain rounded-md border border-gray-200 shadow-lg bg-gray-100"
            />
            {/* hover button */}
            <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
              <Button
                text={"Shop"}
                bgColor={"bg-primary"}
                textColor={"text-white"}
                onClick={() => navigate(`/product/${product?._id}`)}
              />
            </div>
          </div>
          <div className="leading-7 ">
            <h2 className="font-semibold text-wrap">{product?.name}</h2>
            <h2 className="font-bold">₹{product?.price}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
