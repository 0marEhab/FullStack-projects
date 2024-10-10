import React, { useEffect, useState } from "react";
import summaryApi from "../../common";
import CategoriesTable from "../../components/Products/CategoriesTable";
import { tokenLoader } from "../../util/auth";
import { toast } from "react-toastify";

export default function ProductTable() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(summaryApi.getCategories.url, {
          headers: {
            Authorization: `Bearer ${tokenLoader()}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setCategory(data);
        } else {
          setError("Failed to load categories");
          toast.error("Failed to load categories");
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching categories");
        toast.error("An error occurred while fetching categories");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <CategoriesTable category={category} />;
}
