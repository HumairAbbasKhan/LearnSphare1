import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BACKEND_URL } from "../utils/utils";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error("Invalid server response. Please try again.");
      }

      if (!response.ok) {
        if (data?.message) {
          toast.error(data.message);
        } else {
          toast.error("Signup failed! Please try again.");
        }
        return;
      }

      toast.success("Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Signup Error:", err);
      toast.error(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 ">
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-start text-white px-6 md:pt-6 sm:pt-12">
        <div className="bg-gray-900 bg-opacity-30 p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="flex items-center space-x-2 pb-8 justify-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-orange-500 mb-0">
              Signup
            </h2>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-500 mb-0">
              To Join us
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 pr-10"
                required
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-orange-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
