import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  IoMoon,
  IoSunny,
  IoMail,
  IoChatbubbles,
  IoTrash,
} from "react-icons/io5";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const getToken = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return null;
      const parsedUser = JSON.parse(storedUser);
      return parsedUser?.token || null;
    } catch (error) {
      return null;
    }
  };

  const token = getToken();

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/users/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Account deleted successfully.");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`flex-1 p-8 transition-all duration-300 bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center ${
          isSidebarOpen ? "ml-64" : "ml-0 md:ml-64"
        }`}
      >
        <h2 className="text-4xl font-bold text-orange-500 mb-6">Settings</h2>
        <div className="w-full max-w-lg space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between items-center transition hover:bg-gray-700">
            <span className="text-lg font-medium">Dark Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                darkMode ? "bg-orange-500" : "bg-gray-500"
              }`}
            >
              {darkMode ? (
                <IoSunny className="text-white" size={20} />
              ) : (
                <IoMoon className="text-white" size={20} />
              )}
            </button>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-4 transition hover:bg-gray-700">
            <h3 className="text-lg font-semibold text-gray-300">
              Notifications
            </h3>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <IoMail size={20} /> Email Notifications
              </span>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    email: !notifications.email,
                  })
                }
                className="h-5 w-5 text-orange-500 cursor-pointer"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <IoChatbubbles size={20} /> SMS Notifications
              </span>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    sms: !notifications.sms,
                  })
                }
                className="h-5 w-5 text-orange-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-red-800 p-4 rounded-lg shadow-lg transition hover:bg-red-700">
            <h3 className="text-lg font-semibold text-white">Danger Zone</h3>
            <button
              onClick={handleDeleteAccount}
              className="w-full flex items-center justify-center gap-2 p-3 mt-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-bold shadow-md"
            >
              <IoTrash size={20} /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
