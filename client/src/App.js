import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

//components

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";

// toast.configure();
{/* <ToastContainer /> */ }

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();
      parseRes === 1 ? setIsAuthenticated(1) : parseRes===2 ? setIsAuthenticated(2) : setIsAuthenticated(0);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(0);

  const setAuth = x => {
    setIsAuthenticated(x);
    console.log(isAuthenticated);
  };

  return (
    <>

      <Router>
        <Routes>

          <Route path="register"
            element={
              isAuthenticated == 1 ? (
                <Register setAuth={setAuth} />
              ) : isAuthenticated == 2 ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="dashboard"
            element={
              isAuthenticated == 1 ? (
                <Dashboard setAuth={setAuth} />
              ) :
                isAuthenticated == 2 ? (
                  <Navigate replace to={"/admin"} />
                ) : (
                  <Navigate replace to={"/"} />
                )
            }
          />
          <Route
            path="admin"
            element={
              isAuthenticated == 2 ? (
                <AdminDashboard setAuth={setAuth} />
              ) : isAuthenticated == 1 ? (
                <Navigate replace to={"/dashboard"} />
              ) : (
                <Navigate replace to={"/"} />
              )
            } />
          <Route
            path=""
            element={
              isAuthenticated == 0 ? (
                <Login setAuth={setAuth} />
              ) :
                isAuthenticated == 2 ? (
                  <Navigate replace to={"/admin"} />
                ) : (
                  <Navigate replace to={"/dashboard"} />
                )
            } />

        </Routes>
      </Router>
    </>
  );
}

export default App;
