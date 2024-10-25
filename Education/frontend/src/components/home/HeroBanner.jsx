import React from "react";

export default function HeroBanner() {
  return (
    <div className=" md:block relative">
      <img src="/heroBanner.png" alt="" className="hidden md:block w-full h-auto" />
      <div className="md:absolute mt-20 md:mt-0 text-center md:text-start  md:left-52 md:top-1/2 transform md:-translate-y-1/2">
        <p className="md:text-6xl text-4xl font-Dm">Build Skills with </p>
        <p className="md:text-6xl text-4xl font-Dm">Online Course</p>
        <div className="w-full md:w-[600px] mt-6">
          <p className=" text-lg">
            We denounce with righteous indignation and dislike men who are so
            beguiled and demoralized that cannot trouble.
          </p>
        </div>
        <button className="px-12 py-3 mt-5 rounded-full text-white bg-primary hover:bg-primary-foreground duration-100">
          Explore Course
        </button>
      </div>
    </div>
  );
}
