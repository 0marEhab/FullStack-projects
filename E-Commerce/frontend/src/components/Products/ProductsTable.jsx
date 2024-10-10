import React, { useState, useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import Aside from "../layout/Aside";
import { editSlice } from "../../store/editSlice";
import AddProductModal from "../Modal/AddProductModal";
import summaryApi from "../../common";
import { Delete } from "../../util/Fetch";
import { useDispatch } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function ProductsTable({ products, category }) {
  const [productList, setProductList] = useState(products.products);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
  const dispatch = useDispatch();
  const user = useLoaderData();

  const handleAdd = useCallback(() => {
    dispatch(editSlice.actions.open());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditingProduct(product); // Set the product to edit
    dispatch(editSlice.actions.open()); // Open the modal
  };

  const deleteAction = async (productId) => {
    await Delete(summaryApi.deleteProduct.url, productId);
    setProductList((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  // Function to add the new product to the productList
  const handleAddProduct = (newProduct) => {
    setProductList((prevList) => [...prevList, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  return (
    <>
      <AddProductModal
        category={category}
        product={editingProduct} // Pass the product to the modal for editing
        onUpdateProduct={handleUpdateProduct} // Callback for updating the product
        onAddProduct={handleAddProduct}
      />

      <Aside user={user} />
      <div className="m-4 flex flex-wrap justify-center items-center gap-2">
        <button
          onClick={handleAdd}
          className="focus:outline-none text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg text-sm px-5 py-2.5 shadow-md transition-all duration-200"
        >
          Add Product
        </button>
      </div>
      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
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
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, rowIndex) => (
              <tr
                key={product._id || rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-150"
              >
                <td className="px-6 py-4">{product.name || "N/A"}</td>
                <td className="px-6 py-4">{product.price || "N/A"}</td>
                <td className="px-6 py-4">{product.description || "N/A"}</td>
                <td className="px-6 py-4">{product.stock || "N/A"}</td>
                <td className="px-6 py-4">{product.category.name || "N/A"}</td>
                <td className="px-6 py-4">
                  <img
                    className="rounded-full w-[60px] h-[60px] md:w-[100px] md:h-[100px] object-contain"
                    src={product.image || "N/A"}
                    alt={product.name || "Product Image"}
                  />
                </td>
                <td className="px-6 py-4 text-center flex space-x-2 justify-center">
                  <button
                    className="focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-full text-sm w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200"
                    aria-label="Delete Product"
                    onClick={() => deleteAction(product._id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-full text-sm w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200"
                    aria-label="Edit Product"
                    onClick={() => handleEdit(product)} // Call handleEdit when editing
                  >
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
