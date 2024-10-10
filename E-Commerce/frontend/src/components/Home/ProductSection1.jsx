import React, { useState, useEffect } from "react";

import { useLoaderData } from "react-router-dom";
export default function ProductSection1() {
  const [banners, setBanners] = useState([""]);
  let firstBanner, secondBanner, thirdBanner, fourthBanner, fifthBanner;

  const data = useLoaderData();
  useEffect(() => {
    setBanners(data.banners.allBanners);
  }, [data]);

  banners.map((banner) => {
    banner.location == "first-product" ? (firstBanner = banner) : undefined;
    banner.location == "second-product" ? (secondBanner = banner) : undefined;
    banner.location == "third-product" ? (thirdBanner = banner) : undefined;
    banner.location == "fourth-product" ? (fourthBanner = banner) : undefined;
    banner.location == "fifth-product" ? (fifthBanner = banner) : undefined;
  });

  return (
    <div className="flex flex-col  p-10">
      <div className=" flex md:flex-row flex-col  gap-4 mb-8">
        {/* First Product Card */}
        <div className="relative md:w-2/3 h-[400px] rounded-lg overflow-hidden">
          <img
            src={
              firstBanner
                ? firstBanner.product.image
                : "https://via.placeholder.com/950x400"
            }
            alt="Product"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0   flex flex-col justify-end md:justify-center  mx-12 mb-8   w-[200px]  ">
            <p className="text-white text-2xl font-Playfair mt-8 mb-4">
              {firstBanner ? firstBanner.product.name : "no Title"}
            </p>
            <button className="bg-blue-500 w-[200px] text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
              Shop Now
            </button>
          </div>
        </div>

        {/* Second Product Card */}
        <div className="relative md:w-1/3 h-[400px] rounded-lg bg-blue-300 overflow-hidden">
          <img
            src={
              secondBanner
                ? secondBanner.product.image
                : "https://via.placeholder.com/470x400"
            }
            alt="Another Product"
            className="w-full h-full object-cover"
          />
          {/* Overlay content for the second product card */}
          <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 duration-300 flex flex-col justify-center items-center">
            <p className="text-white text-2xl font-bold mb-4">
              {secondBanner ? secondBanner.product.name : "no Title"}
            </p>
            <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300">
              Discover Now
            </button>
          </div>
        </div>
      </div>
      <div className="flex  md:flex-row flex-col justify-center  gap-4">
        <div className=" flex md:flex-row flex-col  gap-4">
          {/* third Product Card */}
          <div className="relative md:w-2/4 h-[300px] rounded-lg overflow-hidden">
            <img
              src={
                thirdBanner
                  ? thirdBanner.product.image
                  : "https://via.placeholder.com/700x300"
              }
              alt="Product"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0   flex flex-col justify-end md:justify-center  mx-12 mb-8   w-[200px]  ">
              <p className="text-white md:text-black text-2xl font-bold w-[150px] mt-8 mb-4">
                {thirdBanner ? thirdBanner.product.name : "no Title"}
              </p>
              <button className="bg-gray-800 w-[200px] text-white py-2 px-4 rounded-full hover:bg-gray-900 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>

          {/* forth Product Card */}
          <div className="relative md:w-1/4 h-[300px] rounded-lg  overflow-hidden">
            <img
              src={
                fourthBanner
                  ? fourthBanner.product.image
                  : "https://via.placeholder.com/350x300"
              }
              alt="Another Product"
              className="w-full h-full object-cover"
            />
            {/* Overlay content for the second product card */}
            <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 duration-300 flex flex-col justify-center items-center">
              <p className="text-white text-2xl font-bold p-5 mb-4">
                {" "}
                {fourthBanner ? fourthBanner.product.name : "no Title"}
              </p>
              <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300">
                shop Now
              </button>
            </div>
          </div>
          {/* fifth Product Card */}
          <div className="relative md:w-1/4 h-[300px] rounded-lg  overflow-hidden">
            <img
              src={
                fifthBanner
                  ? fifthBanner.product.image
                  : "https://via.placeholder.com/350x300"
              }
              alt="Another Product"
              className="w-full h-full object-cover"
            />
            {/* Overlay content for the second product card */}
            <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 duration-300 flex flex-col justify-between p-8">
              <p className="text-white text-2xl font-bold mb-4 w-[100px]">
                {fifthBanner ? fifthBanner.product.name : "no Title"}
              </p>
              <button className="bg-white font-bold   w-[140px] text-black py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300">
                Shop now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
