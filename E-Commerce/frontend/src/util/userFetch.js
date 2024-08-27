import { redirect } from "react-router-dom";
import summaryApi from "../common";
import { tokenLoader } from "./auth";

export async function userFetch() {
  try {
    const token = await tokenLoader();

    if (!token) {
      return redirect("/login");
    }

    const response = await fetch(summaryApi.user.url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
       
        localStorage.removeItem("token");
        return redirect("/login");
      } else if (response.status === 500) {
        throw new Error("Server Error");
      } else {
        throw new Error("Could not fetch user");
      }
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    return error;
  }
}
