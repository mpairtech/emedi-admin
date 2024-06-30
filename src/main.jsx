import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-responsive-modal/styles.css";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";

import AuthProvider from "./components/providers/AuthProvider.jsx";
import AdminRoute from "./AdminRoute.jsx";
import Layout from "./admin/components/shared/Layout.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";

import Company from "./admin/pages/Company.jsx";
import Generic from "./admin/pages/Generic.jsx";
import Category from "./admin/pages/Category.jsx";
import Product from "./admin/pages/Product.jsx";
import ProductDetails from "./admin/pages/ProductDetails.jsx";

import "react-pure-modal/dist/react-pure-modal.min.css";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import AllProducts from "./admin/pages/AllProducts.jsx";
import { AllOrders } from "./admin/pages/AllOrders.jsx";
import Order from "./admin/pages/Order.jsx";
import { Coupon } from "./admin/pages/Coupon.jsx";
import HomeSlider from "./admin/pages/HomeSlider.jsx";
import Prescription from "./admin/pages/Prescripton.jsx";
import AllPrescriptions from "./admin/pages/Prescriptionzz.jsx";
import { UserList } from "./admin/pages/UserList.jsx";
import UserDetail from "./admin/pages/UserDetail.jsx";
import Referral from "./admin/pages/Referral.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/admin",
    element: (
      <AdminRoute>
        <Layout />
      </AdminRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminRoute>
            <AllProducts />
          </AdminRoute>
        ),
      },

      {
        path: "product",
        element: (
          <AdminRoute>
            <Product />
          </AdminRoute>
        ),
      },

      {
        path: "product-details",
        element: (
          <AdminRoute>
            <ProductDetails />
          </AdminRoute>
        ),
      },

      {
        path: "company",
        element: (
          <AdminRoute>
            <Company />
          </AdminRoute>
        ),
      },
      {
        path: "generic",
        element: (
          <AdminRoute>
            <Generic />
          </AdminRoute>
        ),
      },
      {
        path: "category",
        element: (
          <AdminRoute>
            <Category />
          </AdminRoute>
        ),
      },
      {
        path: "order",
        element: (
          <AdminRoute>
            <Order />
          </AdminRoute>
        ),
      },
      {
        path: "coupon",
        element: (
          <AdminRoute>
            <Coupon />
          </AdminRoute>
        ),
      },

      {
        path: "home-slider",
        element: (
          <AdminRoute>
            <HomeSlider />
          </AdminRoute>
        ),
      },
      {
        path: "prescription",
        element: (
          <AdminRoute>
            <Prescription />
          </AdminRoute>
        ),
      },
      {
        path: "all-prescriptions",
        element: (
          <AdminRoute>
            <AllPrescriptions />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <UserList />
          </AdminRoute>
        ),
      },
      {
        path: "user-detail",
        element: (
          <AdminRoute>
            <UserDetail />
          </AdminRoute>
        ),
      },
      {
        path: "referral",
        element: (
          <AdminRoute>
            <Referral />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
