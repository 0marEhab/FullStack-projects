import React, { memo } from "react";
import { Link } from "react-router-dom";

const SubNav = memo(function SubNav() {
  return (
    <div className="w-screen h-16 bg-[#3f100b] flex  gap-4 items-center text-slate-100 overflow-auto">
      <Link to="/all-product">
        <button className="text-md mx-8 md:text-2xl hover:text-red-300 ease-in duration-75">
          All Product
        </button>
      </Link>
      <Link to="/products">
        <button className="text-md mx-8 md:text-2xl hover:text-red-300 ease-in duration-75">
          Today's Deal
        </button>
      </Link>
      <Link to="/products">
        <button className="text-md mx-8 md:text-2xl hover:text-red-300 ease-in duration-75">
          Electronics
        </button>
      </Link>
      <Link to="/products">
        <button className="text-md mx-8 md:text-2xl hover:text-red-300 ease-in duration-75">
          Mobile Phones
        </button>
      </Link>
    </div>
  );
});

export default SubNav;
