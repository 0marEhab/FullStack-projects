import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import summaryApi from "../../common";
import { useSearchParams } from "react-router-dom";
import { tokenLoader } from "../../util/auth";
import { useNavigate } from "react-router-dom";
export default function Products() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState(0); // New state for price range
  const navigate = useNavigate();
  const categoryRef = useRef();
  const priceRef = useRef();

  const [searchParams] = useSearchParams();
  const categoryFromParams = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productResponse = await fetch(
          `${summaryApi.products.url}?page=${currentPage}&limit=12&category=${
            categoryFromParams || ""
          }&${query}`
        );
        const categoryResponse = await fetch(summaryApi.getCategories.url, {
          headers: {
            Authorization: `Bearer ${tokenLoader()}`,
          },
        });
        const categoryData = await categoryResponse.json();
        const productData = await productResponse.json();
        setProducts(productData.data);
        setCategory(categoryData);
        setTotalPages(productData.totalPages);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, query, categoryFromParams]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const handleApplyFilters = () => {
    navigate("/products");
    handleClearFilters();
    setQuery(
      `category=${categoryRef.current.value}&price[lte]=${priceRef.current.value}`
    );
  };
  const handleClearFilters = () => {
    setQuery("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-primary">
      {/* Aside for filtering products */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-[#021526] rounded-md py-10 px-6 shadow-lg transform transition-transform lg:relative lg:translate-x-0 ${
          isAsideOpen ? "translate-x-0" : "-translate-x-full"
        } lg:block`}
      >
        <button
          className="text-white lg:hidden hover:text-gray-700"
          onClick={toggleAside}
        >
          {isAsideOpen ? "Close Filters" : "Open Filters"}
        </button>
        <h2 className="text-white text-lg font-bold mb-4">Filter Products</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-white mb-2">Category</label>
            <select className="w-full p-2 border rounded" ref={categoryRef}>
              {category.category && category.category.length > 0 ? (
                category.category.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No categories available
                </option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Price Range</label>
            <input
              ref={priceRef}
              type="range"
              min="0"
              max="99999"
              value={priceRange} // Bind input to priceRange state
              onChange={(e) => setPriceRange(e.target.value)} // Update state on change
              className="w-full"
            />
            <p className="text-white mt-2">Selected Price: ${priceRange}</p>{" "}
            {/* Display price */}
          </div>

          <button
            className="w-full bg-blue-500 text-white p-2 rounded"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
          <button
            className="w-full bg-red-500 text-white p-2 rounded"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="mb-4">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={toggleAside}
          >
            {isAsideOpen ? "Hide Filters" : "Show Filters"}
          </button>
          <h2 className="text-2xl font-bold">Our Products</h2>
        </div>

        {/* Product Grid */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product.name}
                description={product.description}
                image={product.image}
                price={product.price}
                category={product.category.name}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-300 rounded"
          >
            Previous
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === page + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              } rounded`}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
