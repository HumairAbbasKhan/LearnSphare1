import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { BACKEND_URL } from "../utils/utils";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/course/courses`,
          {
            withCredentials: true,
          }
        );
        const discountedCourses = response.data.data.map((course) => ({
          ...course,
          discountedPrice: (course.price * 0.8).toFixed(2),
        }));
        setCourses(discountedCourses);
        setFilteredCourses(discountedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = () => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`flex-1 transition-all duration-300 bg-gradient-to-r from-black to-blue-950 ${
          isSidebarOpen ? "ml-64" : "ml-0 md:ml-64"
        }`}
      >
        <header className="flex justify-between items-center p-6 bg-gradient-to-r from-black to-blue-950 shadow-lg border-b border-gray-700">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-orange-400 md:px-2 px-8">
            Courses
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-500 rounded-full bg-gray-800 px-2 py-1 sm:px-2 sm:py-1">
              <input
                type="text"
                placeholder="Search courses..."
                className="bg-transparent text-white outline-none w-full sm:w-20 md:w-40 placeholder-gray-400 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>
                <FiSearch className="text-gray-400 text-lg" />
              </button>
            </div>
            <FaCircleUser className="text-4xl text-blue-500 cursor-pointer hover:text-blue-400" />
          </div>
        </header>

        <div className="p-6 overflow-y-auto h-[75vh]">
          {loading ? (
            <p className="text-center text-gray-400 text-lg">Loading...</p>
          ) : filteredCourses.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No courses available.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="border border-gray-700 rounded-lg bg-gray-900 p-5 shadow-lg hover:shadow-2xl transition duration-300"
                >
                  <img
                    src={course.image.url}
                    alt={course.title}
                    className="rounded-md mb-4 w-full h-40 object-cover"
                  />
                  <h2 className="font-bold text-xl text-white mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>
                  <div className="flex justify-between items-center mb-4 text-white">
                    <span className="font-semibold text-lg">
                      ${course.discountedPrice}{" "}
                      <span className="text-gray-500 line-through text-sm">
                        ${course.price}
                      </span>
                    </span>
                    <span className="text-green-400 font-semibold">
                      20% off
                    </span>
                  </div>
                  <Link
                    to={`/buy/${course._id}`}
                    className="block text-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Courses;
