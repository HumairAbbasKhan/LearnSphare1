import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Purchases from "./components/Purchases";
import Courses from "./components/Courses";
import BuyPage from "./components/Buy";
import Settings from "./components/Settings";
const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/purchased" element={<Purchases />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/buy/:courseId" element={<BuyPage />} />
      </Routes>
    </>
  );
};

export default App;
