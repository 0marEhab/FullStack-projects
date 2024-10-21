import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./CategorySlider.css"; // Import the custom CSS file

export default function CategorySlider() {
  const data = useLoaderData();
  const categories = data.categories;
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6">Categories</h2>
      <div className="category-slider-container flex overflow-x-auto pb-4 space-x-6">
        {categories.category.map((category) => (
          <div
            key={category._id}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 space-y-4 min-w-[150px] hover:bg-gray-100 transition duration-300 cursor-pointer"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="flex justify-center items-center w-[120px] h-[120px] bg-gray-200 rounded-full overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="object-contain h-full w-full"
              />
            </div>
            <p className="text-lg font-medium text-center">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
