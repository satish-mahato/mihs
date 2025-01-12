import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserAuth from "../auth/UserAuth";
import Dashboard from "./../components/Dashboard1";
import Login from "../components/Login";
import Register from "./../components/Register";
import Paging from "../components/Paging";
import Home from "../components/Home"; // Import the Home component
import FilesByCategory from "../components/FilesByCategory";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Page */}
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
        <Route
          path="/paging"
          element={
            <UserAuth>
              <Paging />
            </UserAuth>
          }
        />
        <Route
          path="/pdf"
          element={
            <UserAuth>
              <FilesByCategory category="pdf"/>
            </UserAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
