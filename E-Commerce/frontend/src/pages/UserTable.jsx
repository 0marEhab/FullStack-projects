import React, { useState, useEffect } from "react";
import UsersTable from "../components/User/UsersTable";
import { redirect, useLoaderData } from "react-router-dom";
import FetchUsers from "../util/Fetch";
import summaryApi from "../common";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await FetchUsers(summaryApi.allUsers.url, "GET", true);
        setUsers(result);
      } catch (err) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <UsersTable users={users} />;
}
