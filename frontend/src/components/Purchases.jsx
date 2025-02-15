import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const getToken = () => {
    try {
      const user = localStorage.getItem("user");
      if (!user) return null;
      if (user.startsWith("ey")) return user;
      const parsedUser = JSON.parse(user);
      return parsedUser?.token || null;
    } catch (error) {
      console.error("Error parsing localStorage user:", error);
      localStorage.removeItem("user");
      return null;
    }
  };

  const token = getToken();
  console.log("Token being sent:", token);

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
      toast.error("First, log in to continue!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setIsLoggedIn(true);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchPurchases = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/users/purchased`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setPurchases(response.data.courses);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchPurchases();
  }, [token]);

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/v1/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully!");
      localStorage.removeItem("user");
      navigate("/login");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error in logging out:", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />

      <div
        className={`bg-gradient-to-r from-black to-blue-950 flex-1 p-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0 md:ml-64"
        }`}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-orange-400 md:px-2 px-8 mb-6">
          My Purchases
        </h1>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {purchases.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {purchases.map((purchase, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg bg-gray-900 p-5 shadow-lg hover:shadow-2xl transition duration-300"
              >
                <img
                  className="rounded-md w-full h-40 object-cover mb-4"
                  src={purchase.image?.url || "https://via.placeholder.com/200"}
                  alt={purchase.title}
                />
                <h3 className="font-bold text-xl text-white mb-2">
                  {purchase.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {purchase.description.length > 100
                    ? `${purchase.description.slice(0, 100)}...`
                    : purchase.description}
                </p>
                <div className="flex justify-between items-center mb-4 text-white">
                  <span className="font-semibold text-lg">
                    ${purchase.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg">
            You have no purchases yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Purchases;
