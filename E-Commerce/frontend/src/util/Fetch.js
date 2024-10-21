import { tokenLoader } from "./auth";

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

export const Delete = async function (url, id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenLoader()}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Delete error:", errorMessage);
      toast.error("Action didn't complete successfully");
      return;
    }

    toast.success("deleted successfully");
  } catch (error) {
    console.error("Delete failed:", error);
    toast.error("An error occurred while deleting ");
  }
};

export const Update = async function (url, id, updatedProduct) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenLoader()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Update error:", errorMessage);
      toast.error("Action didn't complete successfully");
      return response;
    }

    toast.success("Product updated successfully");
    return response;
  } catch (error) {
    console.error("Update failed:", error);
  }
};
