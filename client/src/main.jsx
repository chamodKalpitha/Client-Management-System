import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from "../context/userContext.jsx";
import axios from "axios";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";

//Element
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import client from "./apolloClient/client.js";
import Projects from "./pages/Projects.jsx";
import Clients from "./pages/Clients.jsx";
import Profile from "./pages/Profile.jsx";
import Complain from "./pages/Complain.jsx";
import Users from "./pages/Users.jsx";
import EditUsers, { action as editUserAction } from "./pages/EditUsers.jsx";
import EditClients from "./pages/EditClients.jsx";
import ViewClients from "./pages/ViewClients.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import PublicRoute from "./utils/publicRoute.jsx";

axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password/:userId/:token",
    element: <ResetPassword />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Complain /> },
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "clients",
            element: <Clients />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "complains",
            element: <Complain />,
          },
          {
            path: "clients/new",
            element: <EditClients />,
          },
          {
            path: "clients/:clientId/edit",
            element: <EditClients />,
          },
          {
            path: "clients/:clientId/view",
            element: <ViewClients />,
          },
          {
            path: "users",
            element: (
              <ProtectedRoute requiredRole="admin">
                <Users />
              </ProtectedRoute>
            ),
          },
          {
            path: "users/new",
            element: (
              <ProtectedRoute requiredRole="admin">
                <EditUsers />
              </ProtectedRoute>
            ),
            action: editUserAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
