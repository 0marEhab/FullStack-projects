import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { editSlice } from "../../store/editSlice";
import summaryApi from "../../common";
import { tokenLoader } from "../../util/auth";
import { toast } from "react-toastify";

export default function AddProductModal({ location, products }) {
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function handleClose() {
    dispatch(editSlice.actions.close());
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const data = {
      location: location,
      product: product,
    };

    try {
      const response = await fetch(summaryApi.addBanners.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenLoader()}`,
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          resData.errors.forEach((error) => {
            toast.error(error.msg || "Validation error");
          });
        } else if (response.status === 401) {
          toast.error("Unauthorized: " + resData.message);
        } else {
          toast.error("An error occurred: " + resData.message);
        }
        return;
      }

      toast.success(resData.message);
      handleClose();
    } catch (error) {
      toast.error("Error saving banner:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal>
      <div className="w-[350px] md:w-[700px] flex flex-col bg-slate-200">
        <h2 className="text-4xl m-8">Add Banner</h2>
        <div className="flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <input
              type="text"
              value={location || "undefined"}
              name="location"
              placeholder="Location"
              disabled={true}
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            />
            <select
              name="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            >
              <option value="">Select Product</option>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No products available
                </option>
              )}
            </select>

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
