import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import Aside from "../layout/Aside";
import { editSlice } from "../../store/editSlice";
import AddBannerModal from "../Modal/AddBannerModal";

export default function HomeBanner() {
  const { user, homeData } = useLoaderData();
  const dispatch = useDispatch();
  const [modalLocation, setModalLocation] = useState(null);

  const handleAdd = useCallback(
    (location) => {
      setModalLocation(location);
      dispatch(editSlice.actions.open());
    },
    [dispatch]
  );

  return (
    <div>
      <AddBannerModal location={modalLocation} products={homeData.data} />
      <Aside user={user} />
      <div className="flex flex-col p-10">
        <div className="flex md:flex-row flex-col gap-4 mb-8">
          {/* First Product Card */}
          <div className="relative md:w-2/3 h-[400px] rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/950x400"
              alt="Product"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button
                onClick={() => handleAdd("first-product")}
                className="w-[300px] h-[50px] bg-black text-white rounded-xl"
              >
                Add Banner
              </button>
            </div>
          </div>

          {/* Second Product Card */}
          <div className="relative md:w-1/3 h-[400px] rounded-lg bg-blue-300 overflow-hidden">
            <img
              src="https://via.placeholder.com/470x400"
              alt="Another Product"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 duration-300 flex flex-col justify-center items-center">
              <button
                onClick={() => handleAdd("second-product")}
                className="w-[300px] h-[50px] bg-black text-white rounded-xl"
              >
                Add Banner
              </button>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-center gap-4">
          <div className="flex md:flex-row flex-col gap-4">
            {/* Third Product Card */}
            <div className="relative md:w-2/4 h-[300px] rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/700x300"
                alt="Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button
                  onClick={() => handleAdd("third-product")}
                  className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                >
                  Add Banner
                </button>
              </div>
            </div>

            {/* Fourth Product Card */}
            <div className="relative md:w-1/4 h-[300px] rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/350x300"
                alt="Another Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 duration-300 flex flex-col justify-center items-center">
                <button
                  onClick={() => handleAdd("fourth-product")}
                  className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                >
                  Add Banner
                </button>
              </div>
            </div>

            {/* Fifth Product Card */}
            <div className="relative md:w-1/4 h-[300px] rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/350x300"
                alt="Another Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 duration-300 flex flex-col justify-center items-center">
                <button
                  onClick={() => handleAdd("fifth-product")}
                  className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                >
                  Add Banner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
