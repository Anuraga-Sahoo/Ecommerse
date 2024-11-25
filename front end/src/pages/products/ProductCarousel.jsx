import React from "react";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import{useNavigate} from 'react-router-dom'
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
const contentStyle = {
  height: "160px",
  // color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
const navigate=useNavigate()
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="mb-4 lg:block xl:block md:block font-poppins">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="text-white xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <div className=" flex justify-between h-[60vh] w-[25vw] font-poppins">
                  <img
                    src={image}
                    alt={name}
                    className=" rounded-lg object-fit w-[250px] h-[350px] ml-3 mt-16"
                    onClick={()=>navigate(`/product/${_id}`)}
                  />
                  <div className="mt-8  ml-8 flex flex-col ">
                    <h2 className=" ml-5 font-poppins font-bold text-[22px]">
                      {name}
                    </h2>
                    <p className=" ml-5 font-semibold text-[20px] mt-1">
                      {" "}
                      ₹ {price}
                    </p>{" "}
                    <br /> <br />
                    <p className="  ml-5 w-[25rem]">
                      {description.substring(0, 170)} ...
                    </p>
                    <div className=" mt-4 ml-4">
                      <h1 className="flex items-center mb-4">
                        <FaStore className="mr-2 text-black" color="green" />{" "}
                        Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-4">
                        <FaClock className="mr-2 text-black" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-4">
                        <FaStar className="mr-2 text-black" color="#FFAD01" />{" "}
                        Reviews:
                        {numReviews}
                      </h1>

                      <div className="two">
                        <h1 className="flex items-center mb-4">
                          <FaStar className="mr-2 text-black" color="#FFAD01" />{" "}
                          Ratings: {Math.round(rating)}
                        </h1>
                        <h1 className="flex items-center mb-4">
                          <FaShoppingCart
                            className="mr-2 text-black"
                            color="#ADD8E6"
                          />{" "}
                          Quantity: {quantity}
                        </h1>
                        <h1 className="flex items-center mb-4">
                          <FaBox className="mr-2 text-white" /> In Stock:{" "}
                          {countInStock}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
