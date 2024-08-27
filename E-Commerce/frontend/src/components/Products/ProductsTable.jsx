import React, { useState, useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import Aside from ".././layout/Aside";
import { editSlice } from "../../store/editSlice";
import AddProductModal from "../Modal/AddProductModal";
import { useDispatch } from "react-redux";
import { MdModeEdit } from "react-icons/md";
export default function ProductsTable({ products, category }) {
  const [productList, setProductList] = useState(products.products);
  const dispatch = useDispatch();
  const user = useLoaderData();

  const handleAdd = useCallback(() => {
    dispatch(editSlice.actions.open());
  }, [dispatch]);

  // Function to add the new product to the productList
  const handleAddProduct = (newProduct) => {
    setProductList((prevList) => [...prevList, newProduct]);
  };

  return (
    <>
      <AddProductModal category={category} onAddProduct={handleAddProduct} />
      <Aside user={user} />
      <div className="m-4 flex justify-center items-center">
        <button
          onClick={handleAdd}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Add Product
        </button>
        <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Add Category
        </button>
      </div>
      {/* table */}
      <div className="relative overflow-x-auto z-0">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Product Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, rowIndex) => (
              <tr
                key={product._id || rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{product.name || "N/A"}</td>
                <td className="px-6 py-4">{product.price || "N/A"}</td>
                <td className="px-6 py-4">{product.description || "N/A"}</td>
                <td className="px-6 py-4">{product.stock || "N/A"}</td>
                <td className="px-6 py-4">{product.category.name || "N/A"}</td>
                <td className="px-6 py-4">
                <img
                    className=" rounded-full w-[60px] h-[60px]  md:w-[100px] md:h-[100px]"
                    src={product.image || "N/A"}
                    alt=""
                  />
                </td>
                <td className="flex mt-7 px-3 py-4">
                  <button className="focus:outline-none  text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm w-[40px] h-[40px] me-2 mb-2">
                    X
                  </button>
                  <button className="focus:outline-none flex  items-center justify-center  text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm w-[40px] h-[40px] me-2 mb-2">
                  <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

