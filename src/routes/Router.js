import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../views/Dashboard.js";
import Expenses from "../components/Expenses/Expenses.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Files = lazy(() => import("../views/Files.js"));
const Employees = lazy(() => import("../views/Employees.js"));
const Login = lazy(() => import("../views/Login.js"));

/*****Routes******/

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to='/login' />;
};

const ThemeRoutes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <FullLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Navigate to='/dashboard' /> },
      { path: "/files", element: <Files /> },
      { path: "/employees", element: <Employees /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/expenses", element: <Expenses /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default ThemeRoutes;
