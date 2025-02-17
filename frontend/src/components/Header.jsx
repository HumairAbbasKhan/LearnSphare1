import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".menu-container") && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMenuOpen]);

  return (
    <header className="bg-gradient-to-r from-black to-blue-950 text-white p-4 relative">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full"
          />
          <h1 className="text-2xl text-orange-500 font-bold ml-2 sm:text-lg">
            LearnSphere
          </h1>
        </div>
        <div
          className="md:hidden flex items-center z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FaTimes className="text-white text-2xl cursor-pointer" />
          ) : (
            <FaBars className="text-white text-2xl cursor-pointer" />
          )}
        </div>
        <nav className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to={"/purchased"}
                className="border border-white px-4 py-2 rounded-lg transition duration-200 hover:bg-orange-500 font-bold"
              >
                MY Courses
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                }}
                className="border border-white px-6 py-2 rounded-lg transition duration-200 hover:bg-red-500 font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to={"/login"}
              className="border border-white px-6 py-2 rounded-lg transition duration-200 hover:bg-orange-500 font-bold"
            >
              Login
            </Link>
          )}
        </nav>
        <div
          className={`absolute top-full left-0 w-full bg-gray-800 bg-opacity-90 md:hidden flex flex-col items-center py-4 space-y-4 transition-all duration-300 menu-container ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {isLoggedIn ? (
            <>
              <Link
                to={"/purchased"}
                className="w-full text-center text-xl bold py-2 border-b border-gray-600 hover:bg-orange-500 transition"
              >
                MY Courses
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                  setIsMenuOpen(false);
                }}
                className="w-full text-center py-2 border-b text-xl bold border-gray-600 hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to={"/login"}
              className="w-full text-center py-2 border-b border-gray-600 hover:bg-orange-500 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
