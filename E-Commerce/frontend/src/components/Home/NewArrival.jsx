import React from "react";
import { useLoaderData } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../Products/ProductCard";

export default function NewArrival() {
  const data = useLoaderData();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2500 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 2500, min: 1024 },
      items: 5,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 3,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 639, min: 0 },
      items: 1,
      partialVisibilityGutter: 10,
    },
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center items-center mt-10 font-anton">
        <p className="text-3xl md:text-5xl text-gray-800 opacity-75 mb-10">
          New Arrival
        </p>
      </div>
      <div className="relative">
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          infinite={true}
          autoPlay={true}
          centerMode={false}
          itemClass="px-2"
          className="carousel-container"
        >
          {data &&
            data.data.map((product) => (
              <div key={product._id} className="flex justify-center">
                <ProductCard
                  productId={product._id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  category={product.category.name}
                />
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
}
