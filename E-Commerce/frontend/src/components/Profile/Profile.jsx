import React, { useCallback, useMemo } from "react";
import Aside from ".././layout/Aside";
import summaryApi from "../../common";
import { useDispatch } from "react-redux";
import { editSlice } from "../../store/editSlice";
import EditModal from "../Modal/EditModal";
import { toast } from "react-toastify";
import { useNavigate, useLoaderData } from "react-router-dom";
import { tokenLoader } from "../../util/auth";

const Profile = () => {
  const user = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = useCallback(() => {
    dispatch(editSlice.actions.open());
  }, [dispatch]);

  const deleteAction = useCallback(async () => {
    try {
      const response = await fetch(summaryApi.deleteUser.url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenLoader()}`,
        },
      });

      if (!response.ok) {
        toast.error("Could not delete the account");
        return;
      }

      toast.success("Account deleted successfully");
      navigate("/login");
    } catch (error) {
      toast.error("An error occurred while deleting the account");
      console.error("Delete action error:", error); // Log error details
    }
  }, [navigate]);

  // Memoize the user's profile picture URL
  const profilePicUrl = useMemo(
    () => summaryApi.backend.url + user.profilePic,
    [user.profilePic]
  );

  return (
    <>
      <EditModal user={user} />
      <Aside user={user} />
      <div className="h-screen flex flex-col items-center justify-center md:flex-row">
        <div className="w-full md:w-auto mt-5 md:mt-0 flex justify-center items-center">
          <img
            className="rounded-full mb-16 md:m-0 w-[150px] h-[150px] md:rounded-3xl md:w-[500px] md:h-[500px]"
            src={user.profilePic ? profilePicUrl : "/default.png"}
            alt="User avatar"
          />
        </div>
        <div className="w-full md:w-[800px] flex justify-center flex-col h-auto md:h-[500px] bg-slate-300 rounded-xl p-5 md:p-0">
          <h1 className="font-Anton text-3xl md:text-5xl m-5 md:m-10 font-bold">
            Profile
          </h1>
          <div className="flex items-center flex-col h-full">
            <input
              type="text"
              className="bg-gray-100 border w-full md:w-[400px] mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={user.name}
              disabled
              readOnly
            />
            <input
              type="text"
              className="bg-gray-100 border w-full md:w-[400px] mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={user.email}
              disabled
              readOnly
            />
            <input
              type="text"
              className="bg-gray-100 border w-full md:w-[400px] mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={user.mobile}
              disabled
              readOnly
            />
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Change Password
            </button>
          </div>
          <div className="flex justify-end items-end mt-5 md:mr-8 md:mb-5">
            <button
              onClick={handleEdit}
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Edit Profile
            </button>
            <button
              onClick={deleteAction}
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Profile);
