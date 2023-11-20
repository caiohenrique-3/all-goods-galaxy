// dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// routes
import App from "./App.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import ShoppingCartPage from "./routes/ShoppingCartPage.jsx";

// contexts
import { UserProvider } from "./contexts/userContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
  },

  {
    path: "/register",
    element: (
      <UserProvider>
        <RegisterPage />
      </UserProvider>
    ),
  },

  {
    path: "/login",
    element: (
      <UserProvider>
        <LoginPage />
      </UserProvider>
    ),
  },

  {
    path: "/shopping-cart",
    element: (
      <UserProvider>
        <ShoppingCartPage />
      </UserProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
