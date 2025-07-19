import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute"
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import NotFound from "../pages/NotFound";

const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Store = lazy(() => import("../pages/Store"));
const Order = lazy(() => import("../pages/Order"));

export const routes: RouteObject[] = [
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "register", element: <PublicRoute element={<Register />} /> },
            { path: "login", element: <PublicRoute element={<Login />} /> },
        ]
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <ProtectedRoute element={<Store />} /> },
            { path: "Orders", element: <ProtectedRoute element={<Order />} /> }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]