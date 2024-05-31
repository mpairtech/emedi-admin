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
        path: "product",
        element: (
            <AdminRoute>
              <Product />
            </AdminRoute>
        ),
      },

      {
        path: "product-details",
        element: <ProductDetails />,
      },
    ],
  },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
