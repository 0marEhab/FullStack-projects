import React from "react";
import { Form, Link, useRouteLoaderData } from "react-router-dom";
import Logo from "../../assests/logo.webp";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";

export default function NavBar() {
  const token = useRouteLoaderData("root");
  return (
    <nav className="flex flex-row items-center justify-between shadow-md bg-white overflow-hidden">
      <div>
        <Link to="/">
          <img src={Logo} alt="logo" className=" size-28 mx-5" />
        </Link>
      </div>

      <div className="hidden md:flex flex-row items-center">
        <span>
          <input
            type="text"
            className="  w-[400px] bg-slate-200 rounded-md  outline-none px-10 py-1"
            placeholder="search product here..."
          />
        </span>
        <GrSearch className=" size-6 className='text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white'" />
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="cursor-pointer relative flex justify-center">
          <Link to="/profile">
            <FaRegUserCircle className="size-10" />
          </Link>
        </div>
        <div className=" relative">
          <FaShoppingCart className="size-10 mx-5" />
          <div>
            <p className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-1 right-3">
              0
            </p>
          </div>
        </div>
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
