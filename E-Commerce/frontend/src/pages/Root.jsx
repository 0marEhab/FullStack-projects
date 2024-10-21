import React,{useEffect} from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import { useDispatch } from "react-redux";
import { fetchCart } from "../store/cartSlice";
export default function Root() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <NavBar  />
      <Outlet />
    </>
  );
}
