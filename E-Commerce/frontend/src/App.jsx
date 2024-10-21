import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import { action as authAction } from "./pages/Login";
import { action as actionLogout } from "./pages/Logout";
import { tokenLoader } from "./util/auth";
import { userFetch } from "./util/userFetch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy loaded components
const LazyHome = React.lazy(() => import("./pages/Home"));
const LazyProfile = React.lazy(() => import("./pages/Profile"));
const LazyHomeBanners = React.lazy(() => import("./pages/HomeBanners"));
const LazySignup = React.lazy(() => import("./pages/Signup"));
const LazyLogin = React.lazy(() => import("./pages/Login"));
const LazyUsersTable = React.lazy(() => import("./pages/UserTable"));
const LazyProductsTable = React.lazy(() => import("./pages/ProductTable.jsx"));
const LazyCategoryTable = React.lazy(() =>
  import("./pages/Category/CategoryTable.jsx")
);
const LazyProducts = React.lazy(() => import("./pages/Products.jsx"));
const LazyDetailedProducts = React.lazy(() => import("./pages/Details.jsx"));
const LazyCart = React.lazy(() => import("./pages/Cart/Cart.jsx"));

import { action as editAction } from "./pages/Profile.jsx";
import { action as signupAction } from "./pages/Signup";
import homeLoader from "./components/Home/homeLoader.js";

const Spinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
);
const combinedLoader = async () => {
  const [user, homeData] = await Promise.all([userFetch(), homeLoader()]);
  return { user, homeData };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: tokenLoader,
    id: "root",
    children: [
      {
        path: "",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazyHome />
          </React.Suspense>
        ),
        loader: homeLoader,
      },
      {
        path: "/profile",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazyProfile />
          </React.Suspense>
        ),
        loader: userFetch,
        action: editAction,
      },
      {
        path: "/homeBanner",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazyHomeBanners />
          </React.Suspense>
        ),
        loader: combinedLoader,
      },

      {
        path: "/signup",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazySignup />
          </React.Suspense>
        ),
        action: signupAction,
      },
      {
        path: "/allUsers",
        errorElement: "error",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazyUsersTable />
          </React.Suspense>
        ),
        loader: userFetch,
      },
      {
        path: "/allProducts",

        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazyProductsTable />
          </React.Suspense>
        ),
        loader: userFetch,
      },
      {
        path: "/allCategories",

        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazyCategoryTable />
          </React.Suspense>
        ),
        loader: userFetch,
      },
      {
        path: "/products",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazyProducts />
          </React.Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazyCart />
          </React.Suspense>
        ),
        loader: userFetch,
      },
      {
        path: "/products/:productName",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazyDetailedProducts />
          </React.Suspense>
        ),
      },
      {
        path: "/logout",
        action: actionLogout,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <React.Suspense fallback={<Spinner />}>
        <LazyLogin />
      </React.Suspense>
    ),
    action: authAction,
  },
]);

export default function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}
