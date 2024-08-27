import React from "react";
import Modal from "./Modal";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editSlice } from "../../store/editSlice";
export default function EditModal() {
  const dispatch = useDispatch();

  function handleEdit() {
    dispatch(editSlice.actions.close());
  }
  return (
    <Modal>
      <div className="w-[350px]  md:w-[700px]  flex  flex-col bg-slate-200  ">
        <h2 className=" text-4xl m-8">Edit Profile</h2>
        <div className=" flex flex-col items-center justify-center">
          <Form
            method="post"
            className="flex flex-col items-center gap-4  "
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            />
            <p className=" bg-slate-400 p-5 w-[350px] md:w-[700px] flex justify-center item-center content-center">
              profile picture
            </p>
            <input
              type="file"
              name="profilePic"
              className="w-[150px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[350px] px-4 py-1 focus:bg-slate-900 ease-in duration-100"
            />

            <button
              type="submit"
              className=" w-[300px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Save
            </button>
          </Form>
          <button
            onClick={handleEdit}
            type="submit"
            className=" w-[300px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
