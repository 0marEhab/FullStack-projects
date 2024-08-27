import { tokenLoader } from "./auth";
import { useNavigate } from "react-router-dom";
import summaryApi from "../common";
import { toast } from "react-toastify";
export default async function Fetch(url, method, tokenbool = false) {
  let response;
  try {
    if (tokenbool) {
      const token = await tokenLoader();
      if (!token) {
        return redirect("/login");
      }
      response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await fetch(url, {
        method: method,
      });
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}

export const Delete = async function (id) {
  try {
    const response = await fetch(`${summaryApi.delete.url}/${id}`, {
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
  } catch (error) {
    toast.error("An error occurred while deleting the account");
    console.error("Delete action error:", error);
  }
};
