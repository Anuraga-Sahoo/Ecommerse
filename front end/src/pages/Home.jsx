import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./products/Product";
// import ProductCarousel from "./products/ProductCarousel";
import "aos/dist/aos.css";
import AOS from "aos";
import image1 from "../assets/headphone.png";
import image2 from "../assets/smartwatch2-removebg-preview.png";
import Slider from "react-slick";
import Banner from "../components/Banner";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import OurProduct from "./products/OurProduct";
import Services from "../components/Services";
import Footer from "../components/Footer";
import ProductCarcV2 from "../components/ProductCarcV2";

const HeroData = [
  {
    id: 1,
    img: image1,
    subtitle: "Beats Solo",
    title: "Wireless",
    title2: "Headphone",
  },
];

const BannerData2 = {
  discount: "30% OFF",
  title: "Happy Hours",
  date: "14 Jan to 28 Jan",
  image: image2,
  title2: "Be A Boat Head ",
  title3: "Summer Sale",
  title4: " Dive into Summer with BOAT Smartwatches!",
  bgColor: "#2dcc6f",
};
const BannerData = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "10 Jan to 28 Jan",
  image: image1,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#f42c37",
};

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  const navigate = useNavigate();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <section className="w-full flex flex-col pl-[4%]">
      {/* <ProductCarousel /> */}

      {/* hero section */}
      <div className="container">
        <div
          className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center
"
        >
          <div className="container pb-8 sm:pb-0">
            {/* Hero section */}
            <Slider {...settings}>
              {HeroData.map((data) => (
                <div key={data.id}>
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    {/* text content section */}
                    <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10 ">
                      <h1
                        data-aos="zoom-out"
                        data-aos-duration="500"
                        data-aos-once="true"
                        className="text-2xl sm:text-6xl lg:text-2xl font-bold"
                      >
                        {data.subtitle}
                      </h1>
                      <h1
                        data-aos="zoom-out"
                        data-aos-duration="500"
                        data-aos-once="true"
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                      >
                        {data.title}
                      </h1>
                      <h1
                        data-aos="zoom-out"
                        data-aos-duration="500"
                        data-aos-once="true"
                        className="text-5xl uppercase text-white dark:text-white/5 sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold"
                      >
                        {data.title2}
                      </h1>
                      <div
                        data-aos="fade-up"
                        data-aos-offset="0"
                        data-aos-duration="500"
                        data-aos-delay="300"
                      >
                        <Button
                          text="Shop"
                          bgColor="bg-primary"
                          textColor="text-white"
                          onClick={() => navigate("/shop")}
                        />
                      </div>
                    </div>
                    {/* Img section */}
                    <div className="order-1 sm:order-2">
                      <div
                        data-aos="zoom-in"
                        data-aos-once="true"
                        className="relative z-10"
                      >
                        <img
                          src={data.img}
                          alt=""
                          className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {!keyword ? (
        <div className="w-full flex items-center justify-center mx-auto mt-2">
          {" "}
          <Header />
        </div>
      ) : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError?.error || "An error occurred"}
        </Message>
      ) : (
        <div>
          <div className="flex justify-between items-center mx-20 mt-20">
            <h1 className="font-poppins font-bold text-[3rem] ml-12">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-md py-2 px-10 text-white"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center gap-10 flex-wrap mt-[2rem] ml-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <ProductCarcV2 product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* banner1 */}
      <div>
        <Banner data={BannerData2} />
      </div>

      {/* our product section */}
      <div>
        <OurProduct />
      </div>

      {/* service section */}
      <div>
        <Services />
      </div>

      {/* banner2 */}
      <div>
        <Banner data={BannerData} />
      </div>

      {/* footer */}
      <div className=" p-0">
        <Footer />
      </div>
    </section>
  );
};

export default Home;
