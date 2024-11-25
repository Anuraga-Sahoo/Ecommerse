import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";

const FooterLinks = [
  {
    title: "Home",
  },
  {
    title: "About",
  },
  {
    title: "Contact",
  },
  {
    title: "Product",
  },
];
const Footer = () => {
  return (
    <>
      <div className="dark:bg-gray-950">
        <div className="container border-t border-gray-500 border-dotted border-b">
          <div className="grid md:grid-cols-3 pb-0 pt-0">
            {/* company details */}
            <div className="py-8 px-4">
              <a
                href="#"
                className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
              >
                E-COMMERCE MANAGEMENT SYSTEM
              </a>
              <p className="text-gray-600 dark:text-white/70  lg:pr-24 pt-3 font-poppins font-[400]">
                "Explore curated collections, secure transactions, and exclusive
                offers from our store. Redefine your online shopping experience
                today."
              </p>
              <p className="text-black mt-4 hover:underline font-poppins font-semibold">
                Shooping from our Online Store
              </p>
            </div>

            {/* Footer links */}
            <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold sm:text-left mb-3">
                  Important Links
                </h1>
                <ul className="space-y-3">
                  {FooterLinks.map((data, index) => (
                    <li key={index}>
                      <a
                        href={data.link}
                        className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300 font-poppins font-[400]"
                      >
                        {data.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* second col links */}
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold sm:text-left mb-3">
                  Quick Links
                </h1>
                <ul className="space-y-3">
                  {FooterLinks.map((data, index) => (
                    <li key={index}>
                      <a className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300 font-poppins font-[400]">
                        {data.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Address */}
              <div className="py-8 px-4 col-span-2 sm:col-auto">
                <h1 className="text-xl font-bold sm:text-left mb-3">Address</h1>
                <div>
                  <div className="flex items-center gap-2 font-poppins">
                    <IoLocation className=" text-brandBlue" size={20} />
                    <p className=" font-[400]">Rasulgarh,Bhubaneswar</p>
                  </div>
                  <div className="flex items-center gap-2 mt-6 font-poppins">
                    <FaMobileAlt className=" text-black font-bold text-[16px]" />
                    <p className=" font-[400]">+91 8456826181</p>
                  </div>

                  {/* social links */}
                  <div className="flex items-center gap-3 mt-6">
                    <a href="https://www.instagram.com/invites/contact/?i=13u9jqy5gj939&utm_content=c6b75sx">
                      <FaInstagram className="text-3xl text-white duration-300 bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-600 rounded-full p-2" />
                    </a>
                    <a href="https://www.fb.com/l/6lp1kJRRR">
                      <FaFacebook className="text-3xl text-[#1877F2] duration-200" />
                    </a>
                    <a href="https://www.linkedin.com/in/kshitish-kumar-nayak-7205a6289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                      <FaLinkedin className="text-3xl text-[#1877F2] duration-200" />
                    </a>
                    <a
                      href="https://youtube.com/@kkvlogs3379?si=uaajCiPrFLbOSF4t"
                      target="_blank"
                    >
                      <FaYoutube className=" text-3xl text-[#FF0000] duration-200" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400 mb-2">
            © 2024{" "}
            <a href="https://flowbite.com/" class="hover:underline">
              E-commerce management system™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
