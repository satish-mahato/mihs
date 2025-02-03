import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserAuth from "../auth/UserAuth";
import Dashboard from "./../components/Dashboard1";
import Login from "../components/Login";
import Register from "./../components/Register";

import Home from "../components/Home"; // Import the Home component
import GalleryPage from "../components/Gallery";

import GalleryList from "../components/GalleryList";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/notice"
          element={
            <UserAuth>
              <Dashboard />
            </UserAuth>
          }
        />
       
        <Route
          path="/gallery"
          element={
            <UserAuth>
              <GalleryPage />
            </UserAuth>
          }
        />
        <Route
          path="/gallerylist"
          element={
            <UserAuth>
              <GalleryList/>
            </UserAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
