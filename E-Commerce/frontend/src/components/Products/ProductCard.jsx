import React from "react";

export default function Product({ name, image, price, category }) {
  return (
    <>
      <div className="bg-white rounded-lg   shadow-xl p-4 w-64" key={name}>
        <img
          src={image}
          alt="Product Image"
          className="w-full h-32 object-contain rounded-lg mb-5"
        />
        <hr className=" border-black opacity-35" />
        <div className="flex justify-between items-center mt-4">
          <button className="text-gray-400 hover:text-gray-600">
            <i className="far fa-heart"></i>
          </button>
        </div>
        <h3 className="text-sm font-semibold mt-2">{name}</h3>
        <p className="text-gray-600">${price}</p>
        <div className="flex justify-between items-center mt-4">
          <button className="bg-gray-100 text-gray-500 p-2 rounded-xl hover:bg-gray-200">
            <i className="fas fa-shopping-cart">{category}</i>
          </button>
        </div>
        <button className="w-full bg-gray-900 text-white hover:bg-gray-800 py-2 rounded-lg">
          Add to cart
        </button>
      </div>
    </>
  );
}
