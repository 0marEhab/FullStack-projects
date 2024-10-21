import React, { useState, useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import Aside from "../layout/Aside";
import { editSlice } from "../../store/editSlice";
import AddCategoryModal from "../Modal/AddCategoryModal";
import { useDispatch } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import summaryApi from "../../common";
import { Delete } from "../../util/Fetch";

export default function CategoriesTable({ category }) {
  const [categoriesList, setCategoriesList] = useState(category.category);
  const [buttonState, setButtonState] = useState(false);
  const dispatch = useDispatch();
  const user = useLoaderData();
  const [editingCategory, setEditingCategory] = useState(null);
  const handleAdd = useCallback(() => {
    dispatch(editSlice.actions.open());
  }, [dispatch]);

  const deleteAction = async (categoryId) => {
    await Delete(summaryApi.deleteCategory.url, categoryId);
    setCategoriesList((prevCategory) =>
      prevCategory.filter((category) => category._id !== categoryId)
    );
  };

  // Function to add the new category to the categoriesList
  const handleAddCategory = (newCategory) => {
    setCategoriesList((prevList) => [...prevList, newCategory]);
  };

  const handleEdit = (category) => {
    setEditingCategory(category); // Set the product to edit
    dispatch(editSlice.actions.open()); // Open the modal
  };

  const handleUpdateCategory = (updatedcategory) => {
    setCategoriesList((prevList) =>
      prevList.map((category) =>
        category._id === updatedcategory._id ? updatedcategory : category
      )
    );
    setEditingCategory(null);
  };

  return (
    <>
      <AddCategoryModal
        onAddCategory={handleAddCategory}
        category={editingCategory}
        onUpdateCategory={handleUpdateCategory}
        buttonState={buttonState}
      />
      <Aside user={user} />
      <div className="m-4 flex justify-center items-center">
        <button
          onClick={() => {
            setButtonState(false);
            handleAdd();
          }}
          className="focus:outline-none text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg text-sm px-5 py-2.5 shadow-lg transition-all duration-200"
        >
          Add Category
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
                Category Image
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.map((category, rowIndex) => (
              <tr
                key={category._id || rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-150"
              >
                <td className="px-6 py-4">{category.name || "N/A"}</td>
                <td className="px-6 py-4">
                  <img
                    className="rounded-full w-[60px] h-[60px] md:w-[100px] md:h-[100px] object-contain"
                    src={category.image || "N/A"}
                    alt={category.name || "category Image"}
                  />
                </td>
                <td className="px-6 py-4 flex justify-center space-x-2">
                  <button
                    onClick={() => {
                      deleteAction(category._id);
                    }}
                    className="focus:outline-none flex items-center justify-center text-white bg-red-600 hover:bg-red-700 font-medium rounded-full text-sm w-9 h-9 shadow-md transition-all duration-200"
                    aria-label="Delete Category"
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="focus:outline-none flex items-center justify-center text-white bg-red-600 hover:bg-red-700 font-medium rounded-full text-sm w-9 h-9 shadow-md transition-all duration-200"
                    aria-label="Edit Category"
                    onClick={() => {
                      setButtonState(true);
                      handleEdit(category);
                    }}
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
