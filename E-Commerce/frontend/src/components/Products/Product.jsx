import React, { useState } from "react";
import ProductCard from "./ProductCard";
import img1 from "../../assests/products/airpodes/boAt Airdopes 111 1.webp";
import img2 from "../../assests/products/mobile/realme 7 Pro (Mirror Silver, 128 GB) (6 GB RAM) 4.webp";
import img3 from "../../assests/products/speakers/boAt Stone 180 1.webp";
import img4 from "../../assests/products/processor/amd Ryzen 7 3800XT 3.9 GHz Upto 4.7 GHz AM4 Socket 8 Cores 16 Threads Desktop Processor (Silver) 1.webp";
export default function Product() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4  bg-[#F9FAFB]">
      {/* Aside for filtering products */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen  bg-[#021526] rounded-md py-10 px-6 shadow-lg transform transition-transform lg:relative lg:translate-x-0 ${
          isAsideOpen ? "translate-x-0" : "-translate-x-full"
        } lg:block`}
      >
        <button
          className="text-white lg:hidden  hover:text-gray-700"
          onClick={toggleAside}
        >
          {isAsideOpen ? "Close Filters" : "Open Filters"}
        </button>
        <h2 className=" text-white text-lg font-bold mb-4">Filter Products</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-white mb-2">Category</label>
            <select className="w-full p-2 border rounded">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home Appliances</option>
            </select>
          </div>
          <div>
            <label className="block text-white mb-2">Price Range</label>
            <input type="range" min="0" max="1000" className="w-full" />
          </div>
          <div>
            <label className="block text-white mb-2">Brand</label>
            <select className="w-full p-2 border rounded">
              <option>All Brands</option>
              <option>Apple</option>
              <option>Samsung</option>
              <option>Sony</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="mb-4">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={toggleAside}
          >
            {isAsideOpen ? "Hide Filters" : "Show Filters"}
          </button>
          <h2 className="text-2xl font-bold">Our Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProductCard
            name="test"
            description="test1"
            image={img1}
            price="30"
            category="testc"
          />
          <ProductCard
            name="test"
            description="test1"
            image={img2}
            price="30"
            category="testc"
          />
          <ProductCard
            name="test"
            description="test1"
            image={img3}
            price="30"
            category="testc"
          />
          <ProductCard
            name="test"
            description="test1"
            image={img4}
            price="30"
            category="testc"
          />
        </div>
      </div>
    </div>
  );
}
