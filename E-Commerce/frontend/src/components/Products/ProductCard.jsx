import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";
import { fetchCart } from "../../store/cartSlice";

export default function Product({ productId, name, image, price, category }) {
  const dispatch = useDispatch();

  const handleAddItem = (productId, quantity = 1) => {
    dispatch(addItemToCart({ productId, quantity }));
    dispatch(fetchCart());
  };

  return (
    <div className="bg-products rounded-lg shadow-xl p-4 w-64">
      <Link to={`/products/${name}`}>
        <img
          src={image}
          alt="Product Image"
          className="w-full h-32 object-contain rounded-lg mb-5"
        />
        <hr className="border-black opacity-35" />
        <div className="flex justify-between items-center mt-4">
          <button className="text-gray-400 hover:text-gray-600">
            <i className="far fa-heart"></i>
          </button>
        </div>
        <h3 className="text-sm font-semibold mt-2  truncate">{name}</h3>
        <p className="text-gray-600">${price}</p>
        <div className="flex justify-between items-center mt-4">
          <button className="bg-gray-100 text-gray-500 p-2 rounded-xl hover:bg-gray-200 mb-3">
            <i className="fas fa-shopping-cart">{category}</i>
          </button>
        </div>
      </Link>
      <button
        onClick={() => handleAddItem(productId)}
        className="w-full bg-gray-900 text-white hover:bg-gray-800 py-2 rounded-lg"
      >
        Add to cart
      </button>
    </div>
  );
}
