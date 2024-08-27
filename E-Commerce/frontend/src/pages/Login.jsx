import React from "react";
import { json, redirect } from "react-router-dom";
import Login from "../components/Auth/Login";
import summaryApi from "../common";

import { toast } from "react-toastify";

function AuthLogin() {
  return <Login />;
}
export default AuthLogin;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(summaryApi.login.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    return json({ message: "Could not login" }, { status: 500 });
  }

  const resData = await response.json();
  toast.success(resData.message);

  const token = resData.token;

  localStorage.setItem("token", token);

  return redirect("/");
}
