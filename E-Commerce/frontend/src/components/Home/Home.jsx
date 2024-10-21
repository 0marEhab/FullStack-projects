import React, { useRef, useEffect } from "react";
import CategorySlider from "./CategorySlider";
import ProductSection1 from "./ProductSection1";
import WeeklyDeals from "./NewArrival";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="bg-primary">
        <div className=" hidden  md:flex justify-center items-center w-screen">
          <div className="relative">
            <img className="w-screen" src="/Home.png" alt="" />
            <div className="absolute inset-0  text-white flex flex-col justify-center items-center">
              <p className="text-7xl font-Anton mb-5"> your Dream is here</p>
              <p className="flex justify-center items-center text-xl  ">
                The time is now for it to be okay to be great. People in this
                world shun people for
              </p>
              <p className="flex justify-center items-center text-xl mb-9 ">
                being great. For being a bright color. For standing out.
              </p>
              <Link to="/products">
                <button className="border-slate-500 border font-Anton text-3xl px-8 py-3 rounded-xl hover:-translate-y-2 duration-300">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <CategorySlider />
        <ProductSection1 />
        <WeeklyDeals />
      </div>
    </>
  );
}
