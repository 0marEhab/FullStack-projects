import React from "react";
import img1 from "../../assests/products/airpodes/boAt Airdopes 111 1.webp";
export default function CategorySlider() {
  return (
    <>
      <div className="p-8">
        <div className="flex flex-col flex-wrap items-center lg:flex-nowrap overflow-scroll scrollbar-none  ">
          <div className=" flex  gap-4">
            <div className="flex flex-col justify-center items-center">
              <div className="h-[100px] w-[100px] flex flex-col justify-center items-center bg-gray-300 rounded-full">
                <img src={img1} alt="" />
              </div>
              <p className="text-xl font-Roboto">Airpodes</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="h-[100px] w-[100px] flex flex-col justify-center items-center bg-gray-300 rounded-full">
                <img src={img1} alt="" />
              </div>
              <p className="text-xl font-Roboto">Airpodes</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="h-[100px] w-[100px] flex flex-col justify-center items-center bg-gray-300 rounded-full">
                <img src={img1} alt="" />
              </div>
              <p className="text-xl font-Roboto">Airpodes</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="h-[100px] w-[100px] flex flex-col justify-center items-center bg-gray-300 rounded-full">
                <img src={img1} alt="" />
              </div>
              <p className="text-xl font-Roboto">Airpodes</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="h-[100px] w-[100px] flex flex-col justify-center items-center bg-gray-300 rounded-full">
                <img src={img1} alt="" />
              </div>
              <p className="text-xl font-Roboto">Airpodes</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="h-[100px] w-[100px] flex flex-col justify-center items-center bg-gray-300 rounded-full">
                <img src={img1} alt="" />
              </div>
              <p className="text-xl font-Roboto">Airpodes</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="h-[100px] w-[100px] flex flex-col justify-center items-center bg-gray-300 rounded-full">
                <img src={img1} alt="" />
              </div>
              <p className="text-xl font-Roboto">Airpodes</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="h-[100px] w-[100px] flex flex-col justify-center items-center bg-gray-300 rounded-full">
                <img src={img1} alt="" />
              </div>  
              <p className="text-xl font-Roboto">Airpodes</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
