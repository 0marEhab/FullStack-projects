import React from "react";
import { toast } from "react-toastify";
import Profile from "../components/Profile/Profile";
import { useLoaderData, json, redirect } from "react-router-dom";
import summaryApi from "../common";
import { tokenLoader } from "../util/auth";

export async function action({ request }) {
  const data = await request.formData();
  console.log(JSON.stringify(data));

  const formData = new FormData();
  formData.append("name", data.get("name"));
  formData.append("email", data.get("email"));
  formData.append("mobile", data.get("mobile"));
  formData.append("profilePic", data.get("profilePic"));

  const response = await fetch(summaryApi.edit.url, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${tokenLoader()}`,
    },
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    return json({ message: "Could not login" }, { status: 500 });
  }

  const resData = await response.json();
  toast.success(resData.message);
  return redirect("/profile");
}

export default function ProfilePage() {
  return (
    <>
      <Profile />
    </>
  );
}
