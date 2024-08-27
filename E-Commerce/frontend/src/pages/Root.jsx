import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";

export default function Root() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
