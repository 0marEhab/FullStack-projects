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
      {/* Conditionally render the aside element based on the sidebar state */}
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
            <h1 className="text-white text-2xl font-bold">{user.name}</h1>
            <h3 className="text-green-500 text-xl font-bold">[{user.role}]</h3>
          </div>
          <div className="flex justify-center items-center flex-col gap-5">
            <Link to="/profile">
              <button className="px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700">
                Profile
              </button>
            </Link>
            {user.role === "admin" && (
              <>
                <Link to="/allUsers">
                  <button className="px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700">
                    All users
                  </button>
                </Link>
                <Link to="/allProducts">
                  <button className="px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700">
                    All Products
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
