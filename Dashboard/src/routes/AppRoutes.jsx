import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserAuth from "../auth/UserAuth";
import Dashboard from "./../components/Dashboard1";
import Login from "../components/Login";
import Register from "./../components/Register";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <UserAuth>
              <Dashboard />
            </UserAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
