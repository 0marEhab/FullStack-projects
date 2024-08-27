import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { editSlice } from "../../store/editSlice";
import summaryApi from "../../common";
import { tokenLoader } from "../../util/auth";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
export default function AddProductModal({ category, onAddProduct }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function handleClose() {
    dispatch(editSlice.actions.close());
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);

    try {
      const response = await fetch(summaryApi.addProducts.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenLoader()}`,
        },
        body: formData,
      });

      const resData = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          resData.errors.forEach((error) => {
            toast.error(error.msg || "Validation error");
          });
          return json({ message: "Validation error" }, { status: 422 });
        } else if (response.status === 401) {
          toast.error("Unauthorized: " + resData.message);
          return json({ message: "Unauthorized" }, { status: 401 });
        } else {
          toast.error("An error occurred: " + resData.message);
          return json(
            { message: "Could not add a new product" },
            { status: 500 }
          );
        }
      }

      toast.success(resData.message);

      // Call the onAddProduct function with the new product
      onAddProduct(resData.product);

      handleClose();
    } catch (error) {
      toast.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal>
      <div className="w-[350px] md:w-[700px] flex flex-col bg-slate-200">
        <h2 className="text-4xl m-8">Add Product</h2>
        <div className="flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col items-center gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            />
            <select
              name="category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            >
              <option value="">Select Category</option>
              {category.category && category.category.length > 0 ? (
                category.category.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No categories available
                </option>
              )}
            </select>
            <p className="bg-slate-400 p-5 w-[350px] md:w-[700px] flex justify-center items-center">
              Product picture
            </p>
            <input
              type="file"
              name="image"
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            />
            <button
              type="submit"
              className="w-[300px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}{" "}
            </button>
          </form>
          <button
            onClick={handleClose}
            type="button"
            className="w-[300px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            disabled={loading}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
