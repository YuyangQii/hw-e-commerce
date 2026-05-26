import { lazy, Suspense } from "react";
import { createHashRouter } from "react-router-dom";

import GlobalErrorPage from "../components/errors/GlobalErrorPage";
import RootLayout from "../components/layout/RootLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RouteErrorBoundary from "../components/errors/RouteErrorBoundary";
import { Spinner } from "../components/ui/Spinner";

const Home = lazy(() => import("../features/products/pages/Home"));
const Products = lazy(() => import("../features/products/pages/Products"));
const ProductDetail = lazy(() => import("../features/products/pages/ProductDetail"));
const Cart = lazy(() => import("../features/cart/pages/Cart"));
const Login = lazy(() => import("../features/auth/pages/Login"));
const Signup = lazy(() => import("../features/auth/pages/Signup"));
const Settings = lazy(() => import("../features/settings/pages/Settings"));

export const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      {
        index: true,
        element: (
          <RouteErrorBoundary name="Home">
            <Suspense fallback={<Spinner />}><Home /></Suspense>
          </RouteErrorBoundary>
        ),
      },
      {
        path: "products",
        element: (
          <RouteErrorBoundary name="Products">
            <Suspense fallback={<Spinner />}><Products /></Suspense>
          </RouteErrorBoundary>
        ),
      },
      {
        path: "products/:id",
        element: (
          <RouteErrorBoundary name="ProductDetail">
            <Suspense fallback={<Spinner />}><ProductDetail /></Suspense>
          </RouteErrorBoundary>
        ),
      },
      {
        path: "login",
        element: (
          <RouteErrorBoundary name="Login">
            <Suspense fallback={<Spinner />}><Login /></Suspense>
          </RouteErrorBoundary>
        ),
      },
      {
        path: "signup",
        element: (
          <RouteErrorBoundary name="Signup">
            <Suspense fallback={<Spinner />}><Signup /></Suspense>
          </RouteErrorBoundary>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "cart",
            element: (
              <RouteErrorBoundary name="Cart">
                <Suspense fallback={<Spinner />}><Cart /></Suspense>
              </RouteErrorBoundary>
            ),
          },
          {
            path: "settings",
            element: (
              <RouteErrorBoundary name="Settings">
                <Suspense fallback={<Spinner />}><Settings /></Suspense>
              </RouteErrorBoundary>
            ),
          },
        ],
      },
    ],
  },
]);
