// NavBar.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Link, useRouteLoaderData, Form } from "react-router-dom";
import Logo from "/logo.webp";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";

export default function NavBar() {
  const token = useRouteLoaderData("root");
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  return (
    <nav className="flex flex-row items-center justify-between shadow-md bg-[#FBFCF8] overflow-hidden">
      <div>
        <Link to="/">
          <img src={Logo} alt="logo" className="size-28 mx-5" />
        </Link>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div className="cursor-pointer relative flex justify-center">
          <Link to="/profile">
            <FaRegUserCircle className="size-10" />
          </Link>
        </div>
        <Link to="./cart">
          <div className="relative">
            <FaShoppingCart className="size-10 mx-5" />
            <div>
              <p className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-1 right-3">
                {cartCount}
              </p>
            </div>
          </div>
        </Link>
        <div>
          {!token && (
            <Link
              to="/login"
              className="px-4 py-2 mr-5 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Login
            </Link>
          )}
          {token && (
            <Form action="/logout" method="post">
              <button className="px-4 py-2 mr-5 rounded-full text-white bg-red-600 hover:bg-red-700">
                Logout
              </button>
            </Form>
          )}
        </div>
      </div>
    </nav>
  );
}
