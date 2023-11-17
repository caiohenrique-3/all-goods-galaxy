// dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import App from "./App.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
