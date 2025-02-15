import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed!");
      }

      if (data.token) {
        localStorage.setItem("user", data.token);
        toast.success("Login successful!");
        navigate("/");
      } else {
        throw new Error("Token not received!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950">
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-start text-white px-6 md:pt-6 sm:pt-12">
        <div className="bg-gray-900 bg-opacity-30 p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="flex items-center space-x-2 pb-8 justify-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-orange-500 mb-0">
              Login
            </h2>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-500 mb-0">
              To Learn
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-orange-400 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
