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
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  let user = null;
  let token = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
    token = localStorage.getItem("token");
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
  }

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to continue!");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
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
        toast.error("Failed to fetch purchases.");
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
      localStorage.removeItem("token");
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

  if (isLoading) {
    return <p className="text-center text-gray-400 text-lg">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />

      <div
        className={`bg-gradient-to-r from-black to-blue-950 flex-1 p-8 h-full min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0 md:ml-64"
        }`}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-orange-400 md:px-2 px-8 mb-6">
          My Purchases
        </h1>

        {purchases.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {purchases.map((purchase, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg bg-gradient-to-b from-gray-900 to-blue-950 p-5 shadow-lg hover:shadow-2xl transition duration-300"
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
