import React, { useEffect, useState } from "react";
import { FaDiscourse, FaDownload, FaBars } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ImCross } from "react-icons/im";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem("user"));
    window.addEventListener("storage", checkAuth);
    checkAuth();

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 bg-gray-900 p-5 transform w-64 z-50 transition-transform duration-300 ease-in-out 
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <nav>
          <ul className="mt-16 md:mt-0 space-y-4">
            <li>
              <Link
                to="/"
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === "/"
                    ? "text-green-400 font-bold"
                    : "text-orange-400"
                }`}
                onClick={toggleSidebar}
              >
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === "/courses"
                    ? "text-green-400 font-bold"
                    : "text-orange-400"
                }`}
                onClick={toggleSidebar}
              >
                <FaDiscourse className="mr-2" /> Courses
              </Link>
            </li>
            <li>
              <Link
                to="/purchased"
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === "/purchased"
                    ? "text-green-400 font-bold"
                    : "text-orange-400"
                }`}
                onClick={toggleSidebar}
              >
                <FaDownload className="mr-2" /> Purchases
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === "/settings"
                    ? "text-green-400 font-bold"
                    : "text-orange-400"
                }`}
                onClick={toggleSidebar}
              >
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-orange-400 p-2 rounded-lg hover:text-red-400"
                >
                  <IoLogOut className="mr-2" /> Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`flex items-center p-2 rounded-lg ${
                    location.pathname === "/login"
                      ? "text-blue-400 font-bold"
                      : "text-orange-400"
                  }`}
                  onClick={toggleSidebar}
                >
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <button
        className="fixed top-6 left-4 z-50 md:hidden bg-orange-600 text-white p-2 rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <ImCross /> : <FaBars />}
      </button>
    </>
  );
};

export default Sidebar;
