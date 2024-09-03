import React from "react";
import { useLoaderData } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../Products/ProductCard";
export default function NewArrival() {
  const data = useLoaderData();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2500 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 2499, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div>
        <div className="flex justify-center items-center mt-10 font-Anton ">
          <p className="text-5xl opacity-65 mb-10">New Arrival</p>
        </div>
        <div className="p-12 ">
          {" "}
          <Carousel
            responsive={responsive}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            infinite={true}
            autoPlay={true}
            className="2xl:p-20"
          >
            {data.data.map((product) => {
              return (
                <ProductCard
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  category={product.category.name}
                />
              );
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
}
