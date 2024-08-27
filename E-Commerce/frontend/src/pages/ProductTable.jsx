import React from "react";
import ProductsTable from "../components/Products/ProductsTable";
import summaryApi from "../common";
import FetchProducts from "../util/Fetch";
import { useEffect, useState } from "react";
import { tokenLoader } from "../util/auth";
import { json, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchProudcts = async () => {
      try {
        const result = await FetchProducts(
          summaryApi.allProducts.url,
          "GET",
          true
        );
        setProducts(result);
        
      } catch (err) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
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
          toast.error("Failed to load categories");
        }
      } catch (error) {
        toast.error("An error occurred while fetching categories");
      }
    }

    fetchCategories();
    fetchProudcts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <ProductsTable products={products} category={category} />;
}
