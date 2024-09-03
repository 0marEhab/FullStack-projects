import React, { useState } from "react";
import summaryApi from "../../common/";
import { Link } from "react-router-dom";

export default function Profile({ user }) {
  const [sidebar, setSideBar] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSideBar((prev) => !prev);
  };

  return (
    <>
     
      <aside
        className={`z-20 bg-gray-700 min-h-screen w-full max-w-xs shadow-lg shadow-black fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-32 flex justify-between items-center flex-col">
          <div className="mt-24 mb-7 relative">
            <img
              className="rounded-full w-24 h-24 object-cover"
              src={summaryApi.backend.url + user.profilePic}
              alt="Profile Pic"
            />
          </div>
          <div className="flex justify-center items-center flex-col mb-10">
            <h1 className="font-Roboto text-white text-2xl font-bold">
              {user.name}
            </h1>
            <h3 className="text-[#39FF14] text-xl font-bold">[{user.role}]</h3>
          </div>
          <div className="flex justify-center items-center flex-col gap-5 ">
            <Link to="/profile">
              <button className="font-Playfair  px-4 py-2 rounded-lg shadow-lg shadow-black text-white bg-gray-800 hover:bg-gray-900 duration-300 w-40">
                Profile
              </button>
            </Link>
            {user.role === "admin" && (
              <>
                <Link to="/allUsers">
                  <button className="font-Playfair px-4 py-2 rounded-lg shadow-lg shadow-black text-white bg-gray-800 hover:bg-gray-900 duration-300 w-40">
                    All users
                  </button>
                </Link>
                <Link to="/allProducts">
                  <button className="font-Playfair px-4 py-2 rounded-lg shadow-lg shadow-black text-white bg-gray-800 hover:bg-gray-900 duration-300 w-40">
                    All Products
                  </button>
                </Link>
                <Link to="/homeBanner">
                  <button className="font-Playfair px-4 py-2 rounded-lg shadow-lg shadow-black text-white bg-gray-800 hover:bg-gray-900 duration-300 w-40">
                    Home Banner
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Button to toggle the sidebar */}
      <button
        onClick={toggleSidebar}
        className={`z-30 bg-blue-500 text-xl text-white rounded-full w-16 h-16 flex items-center justify-center absolute transition-transform duration-300 ease-in-out ${
          sidebar ? " top-96 translate-x-72" : " top-96 -translate-x-10"
        }`}
        style={{ marginTop: "-20px" }}
      >
        {sidebar ? "<" : ">"}
      </button>
    </>
  );
}
