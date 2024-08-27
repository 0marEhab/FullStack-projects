import React, { useState } from "react";
import Aside from "../layout/Aside";
import { Delete } from "../../util/Fetch";
import { useLoaderData } from "react-router-dom";
import summaryApi from "../../common";
export default function UsersTable({ users }) {
  const [userList, setUserList] = useState(users.users);
  const user = useLoaderData();

  const deleteAction = async (userId) => {
    await Delete(userId);
    setUserList((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  return (
    <>
      <Aside user={user} />

      <div className="relative overflow-x-auto z-0">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Profile Pic
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, rowIndex) => (
              <tr
                key={user._id || rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{user.name || "N/A"}</td>
                <td className="px-6 py-4">{user.email || "N/A"}</td>
                <td className="px-6 py-4">{user.role || "N/A"}</td>
                <td className="px-6 py-4">{user.mobile || "N/A"}</td>
                <td className="px-6 py-4">
                  <img
                    className=" rounded-full w-[100px] h-[100px]"
                    src={summaryApi.backend.url + user.profilePic || "N/A"}
                    alt=""
                    srcset=""
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteAction(user._id)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  >
                    Delete
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
