import React from "react";
import logo from "../assets/logo.webp";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-white py-8 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-4">
            <img src={logo} alt="Logo" className="h-8 w-8 rounded-full" />
            <h1 className="text-xl text-orange-500 font-bold ml-3">
              LearnSphere
            </h1>
          </div>
          <p className="text-gray-400 mb-2">Follow us:</p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-600"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-pink-600"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-400"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start justify-center">
          <p className="text-lg text-gray-400 font-semibold">Contact Us</p>
          <p className="text-gray-400 text-sm">
            Email: support@learnsphere.com
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-2">
          <p className="text-gray-400 text-sm">
            © 2025 LearnSphere. All rights reserved.
          </p>
          <div className="flex flex-col space-y-1">
            <a href="/terms" className="text-gray-400 hover:text-orange-500">
              Terms & Conditions
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-orange-500">
              Privacy Policy
            </a>
            <a href="/refunds" className="text-gray-400 hover:text-orange-500">
              Refund and Cancellation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
