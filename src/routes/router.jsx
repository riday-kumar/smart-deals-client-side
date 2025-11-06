import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AllProducts from "../components/AllProducts/AllProducts";
import Register from "../components/Register/Register";
import MyProducts from "../components/MyProducts/MyProducts";
import MyBids from "../components/MyBids/MyBids";
import { PrivateRoute } from "./PrivateRoute";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import CreateAProduct from "../components/CreateAProduct/CreateAProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-products",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/products/:id",
        loader: ({ params }) =>
          fetch(
            `https://smart-deals-api-server-two.vercel.app/products/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/create-product",
        element: (
          <PrivateRoute>
            <CreateAProduct></CreateAProduct>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
