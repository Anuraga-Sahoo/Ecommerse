import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetRecommendedProductsQuery,
} from "../../redux/api/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import HeartIcon from "./HeartIcon";
import moment from "moment";
import Rating from "./Ratings";
import ProductTabs from "./ProductTabs";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { Card } from "antd";
import { animateScroll as scroll } from "react-scroll";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const { data: recommendedProducts, isLoading: loadingRecommendedProducts } =
    useGetRecommendedProductsQuery(productId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loadingNavigation, setLoadingNavigation] = useState(false);
  const [reviewEvent, setReviewEvent] = useState(false);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  console.log("product data", product);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review create Successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
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
    }, 2000);
  };

  useEffect(() => {
    refetch();
    setReviewEvent(false);
  }, [reviewEvent]);

  const { Meta } = Card;
  return (
    <>
      <div>
        <Link
          to="/"
          className=" text-black font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem] font-poppins">
            <div>
              <img
                src={product?.image}
                alt={product?.name}
                className=" w-full xl:w-[25rem] xl:h-[30rem] lg:w-[30rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] object-contain "
              />
            </div>

            <div className=" flex flex-col justify-between ml-[5rem]">
              <h2 className="  font-poppins text-3xl font-semibold">
                {product.name}
              </h2>
              <p className="  my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[black]">
                {product.description}
              </p>
              <p className=" font-poppins text-3xl my-4 font-extrabold ">
                ₹{product.price}
              </p>

              <div className=" flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className=" flex items-center mb-6">
                    <FaStore className=" mr-2 text-black" />
                    Brand: <span className=" font-bold">{product.brand}</span>
                  </h1>
                  <h1 className=" flex items-center mb-6 w-[20rem]">
                    <FaClock className="mr-2 text-black" />
                    Added: <span>{moment(product.createAt).fromNow()}</span>
                  </h1>
                  <h1 className=" flex items-center mb-6">
                    <FaStar className=" mr-2 text-black" />
                    Reviews:{" "}
                    <span className="font-bold">{product.numReviews}</span>
                  </h1>
                </div>

                <div className=" two">
                  <h1 className=" flex items-center mb-6">
                    <FaStar className="mr-2 text-black " />
                    Ratings:
                    <span className=" font-bold ">{product.rating}</span>
                  </h1>
                  <h1 className=" flex items-center mb-6">
                    <FaShoppingCart className=" mr-2 text-black" />
                    Quantity:{" "}
                    <span className=" font-bold">{product.quantity}</span>
                  </h1>
                  <h1 className=" flex items-center mb-6">
                    <FaBox className=" mr-2 text-black" />
                    In_Stock:{" "}
                    <span className="font-bold">{product.countInStock}</span>
                  </h1>
                </div>
              </div>

              <div className=" flex justify-between flex-wrap">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color="green"
                />
              </div>

              <div className=" btn-container flex gap-2">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className=" bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 md:mt-0 font-semibold"
                >
                  Add To Cart
                </button>
                <button className=" flex items-center justify-center ml-2 bg-pink-200 text-white py-2 px-4 rounded-lg mt-4 md:mt-0 font-semibold">
                  <HeartIcon
                    product={product}
                    customClass="text-black"
                    size="21px"
                  />
                </button>
                {product.countInStock > 0 && (
                  <div className=" ml-2">
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
                reviewEvent={() => setReviewEvent(true)}
              />
            </div>
          </div>
        </>
      )}

      {!loadingRecommendedProducts && recommendedProducts && (
        <div className="container mx-auto lg:ml-12">
          <h2 className="text-xl font-bold mb-12 xl:mt-[5rem]">
            Recommended Products
          </h2>
          <div className="grid grid-cols-5 xl:gap-16">
            {recommendedProducts.map((product) => (
              <div key={product._id}>
                <Card
                  hoverable
                  className="w-full object-contain transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-300"
                  cover={<img alt="example" src={product.image} />}
                  // onClick={() => navigate(`/product/${product._id}`)}
                  onClick={() => handleNavigation(`/product/${product._id}`)}
                >
                  <Meta
                    title={product.name}
                    className=" font-poppins font-semibold text-[18px]"
                  />
                  <h2 className=" text-[18px] font-poppins font-semibold mt-4">
                    ${product.price}
                  </h2>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
      {loadingNavigation && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-40">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
