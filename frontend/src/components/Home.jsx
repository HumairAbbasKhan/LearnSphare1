import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/course/courses`);
        console.log(res.data);
        setCourses(res.data.data);
      } catch (error) {
        console.error("Error in fetching courses: ", error);
        setError("Failed to fetch courses.");
      }
    };
    fetchCourses();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen text-white">
      <Header />
      <div className="flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-3xl sm:text-xl font-bold text-orange-500 mt-6 mb-3">
          LearnSphere
        </h1>
        <h2 className="text-lg md:text-base sm:text-sm max-w-2xl leading-relaxed">
          A dynamic and engaging platform offering high-quality courses to help
          you master new skills.
        </h2>
        <div className="space-x-4 my-8">
          <Link
            to={"/courses"}
            className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-lg text-white font-semibold transition"
          >
            Explore Courses
          </Link>
          <Link
            to={"https://youtu.be/52OXJZFMsWk?si=eV20cPYSMoGsZ6Zk"}
            className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-lg text-white font-semibold transition"
          >
            Explore Videos
          </Link>
        </div>
      </div>

      <section className="my-7 max-w-6xl mx-auto">
        {error ? (
          <p className="text-red-500 text-center text-sm md:text-base">
            {error}
          </p>
        ) : (
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-1">
                <div className="rounded-lg p-2 text-center">
                  <div className="h-24 sm:h-20 flex justify-center items-center overflow-hidden hover:scale-110 transition">
                    <img
                      src={course.image.url}
                      alt={course.title}
                      className="w-4/5 sm:w-80% sm:70% h-4/7 object-cover rounded-xl"
                    />
                  </div>

                  <div className="mt-4">
                    <h2 className="text-lg md:text-base sm:text-sm font-semibold mb-2">
                      {course.title}
                    </h2>
                    <Link
                      to={`/buy/${course._id}`}
                      className="bg-orange-500 hover:bg-orange-600 px-2 py-2 rounded-lg text-white font-semibold transition"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
