import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("user");
    console.log("Fetched Token:", token);

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="bg-gradient-to-r from-black to-blue-950 text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-auto w-auto max-h-10 max-w-10 sm:max-h-8 sm:max-w-8 md:max-h-10 md:max-w-10 rounded-full"
          />
          <h1 className="text-2xl text-orange-500 font-bold ml-2 sm:text-base">
            LearnSphere
          </h1>
        </div>

        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="text-white text-2xl" />
          ) : (
            <FaBars className="text-white text-2xl" />
          )}
        </div>

        <div className={`space-x-4 md:flex ${isMenuOpen ? "block" : "hidden"}`}>
          {isLoggedIn ? (
            <>
              <Link
                to={"/purchased"}
                className="border border-white px-3 py-2 rounded-lg transition duration-200 hover:bg-orange-500 font-bold"
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
        </div>
      </div>
    </header>
  );
};

export default Header;
