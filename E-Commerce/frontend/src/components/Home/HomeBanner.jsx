import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import Aside from "../layout/Aside";
import { editSlice } from "../../store/editSlice";
import AddBannerModal from "../Modal/AddBannerModal";

export default function HomeBanner() {
  const { user, homeData } = useLoaderData();
  const [banners, setBanners] = useState([]);
  const [modalLocation, setModalLocation] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (homeData.banners && homeData.banners.allBanners) {
      setBanners(homeData.banners.allBanners);
    }
  }, [homeData.banners]);

  const handleAdd = useCallback(
    (location, banner) => {
      setModalLocation(location);
      setSelectedProduct(banner?.product?._id || ""); // Set the product ID for editing
      dispatch(editSlice.actions.open());
    },
    [dispatch]
  );

  let firstBanner, secondBanner, thirdBanner, fourthBanner, fifthBanner;
  if (banners) {
    banners.forEach((banner) => {
      switch (banner.location) {
        case "first-product":
          firstBanner = banner;
          break;
        case "second-product":
          secondBanner = banner;
          break;
        case "third-product":
          thirdBanner = banner;
          break;
        case "fourth-product":
          fourthBanner = banner;
          break;
        case "fifth-product":
          fifthBanner = banner;
          break;
        default:
          break;
      }
    });
  }

  return (
    <div>
      <AddBannerModal
        location={modalLocation}
        products={homeData.data}
        product={selectedProduct}
      />
      <Aside user={user} />
      <div className="flex flex-col p-10">
        <div className="flex md:flex-row flex-col gap-4 mb-8">
          {/* First Product Card */}
          <div className="relative md:w-2/3 h-[400px] rounded-lg overflow-hidden">
            <img
              src={
                firstBanner?.product?.image ||
                "https://via.placeholder.com/950x400"
              }
              alt="Product"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {!firstBanner ? (
                <button
                  onClick={() => handleAdd("first-product", null)}
                  className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                >
                  Add Banner
                </button>
              ) : (
                <button
                  onClick={() => handleAdd("first-product", firstBanner)}
                  className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                >
                  Edit Banner
                </button>
              )}
            </div>
          </div>

          {/* Second Product Card */}
          <div className="relative md:w-1/3 h-[400px] rounded-lg bg-blue-300 overflow-hidden">
            <img
              src={
                secondBanner?.product?.image ||
                "https://via.placeholder.com/470x400"
              }
              alt="Another Product"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 duration-300 flex flex-col justify-center items-center">
              {!secondBanner ? (
                <button
                  onClick={() => handleAdd("second-product", null)}
                  className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                >
                  Add Banner
                </button>
              ) : (
                <button
                  onClick={() => handleAdd("second-product", secondBanner)}
                  className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                >
                  Edit Banner
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-center gap-4">
          <div className="flex md:flex-row flex-col gap-4">
            {/* Third Product Card */}
            <div className="relative md:w-2/4 h-[300px] rounded-lg overflow-hidden">
              <img
                src={
                  thirdBanner?.product?.image ||
                  "https://via.placeholder.com/700x300"
                }
                alt="Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {!thirdBanner ? (
                  <button
                    onClick={() => handleAdd("third-product", null)}
                    className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                  >
                    Add Banner
                  </button>
                ) : (
                  <button
                    onClick={() => handleAdd("third-product", thirdBanner)}
                    className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                  >
                    Edit Banner
                  </button>
                )}
              </div>
            </div>

            {/* Fourth Product Card */}
            <div className="relative md:w-1/4 h-[300px] rounded-lg overflow-hidden">
              <img
                src={
                  fourthBanner?.product?.image ||
                  "https://via.placeholder.com/350x300"
                }
                alt="Another Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 duration-300 flex flex-col justify-center items-center">
                {!fourthBanner ? (
                  <button
                    onClick={() => handleAdd("fourth-product", null)}
                    className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                  >
                    Add Banner
                  </button>
                ) : (
                  <button
                    onClick={() => handleAdd("fourth-product", fourthBanner)}
                    className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                  >
                    Edit Banner
                  </button>
                )}
              </div>
            </div>

            {/* Fifth Product Card */}
            <div className="relative md:w-1/4 h-[300px] rounded-lg overflow-hidden">
              <img
                src={
                  fifthBanner?.product?.image ||
                  "https://via.placeholder.com/350x300"
                }
                alt="Another Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 duration-300 flex flex-col justify-center items-center">
                {!fifthBanner ? (
                  <button
                    onClick={() => handleAdd("fifth-product", null)}
                    className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                  >
                    Add Banner
                  </button>
                ) : (
                  <button
                    onClick={() => handleAdd("fifth-product", fifthBanner)}
                    className="w-[300px] h-[50px] bg-black text-white rounded-xl"
                  >
                    Edit Banner
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
