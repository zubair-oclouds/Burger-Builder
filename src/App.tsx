import React from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import Orders, { loader as ordersLoader } from "./containers/Orders/Orders";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "./axios-orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <BurgerBuilder /> },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersLoader,
      },
      { path: "checkout", element: <Checkout /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
