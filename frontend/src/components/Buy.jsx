import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Buy() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [cardError, setCardError] = useState("");

  let user, token;
  try {
    user = JSON.parse(localStorage.getItem("user"));
    token = localStorage.getItem("token");
  } catch (error) {
    user = null;
    token = null;
  }

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBuyCourseData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/course/buy/${courseId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setCourse(response.data.course);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setError("You had already purchased this course.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuyCourseData();
  }, [courseId, token, navigate]);

  const handlePurchase = async (event) => {
    event.preventDefault();
    setCardError("");

    if (!stripe || !elements) return;
    setLoading(true);
    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (paymentMethodError) {
        setCardError(paymentMethodError.message);
        setLoading(false);
        return;
      }

      if (!clientSecret) {
        setLoading(false);
        return;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user?.fullName,
              email: user?.email,
            },
          },
        });

      if (confirmError) {
        setCardError(confirmError.message);
      } else if (paymentIntent?.status === "succeeded") {
        const paymentInfo = {
          email: user?.email,
          userId: user?.id,
          courseId,
          paymentId: paymentIntent.id,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
        };

        await axios.post(`${BACKEND_URL}/api/v1/order`, paymentInfo, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        toast.success("Payment Successful");
        setTimeout(() => navigate("/purchased"), 2000);
      }
    } catch (error) {
      toast.error("Error in making payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-950 p-6 text-white">
      {error ? (
        <div className="bg-red-100 text-red-700 p-6 rounded-lg text-center max-w-md">
          <p className="text-lg font-semibold">{error}</p>
          <Link
            className="mt-4 inline-block bg-orange-500 px-4 py-2 rounded-md"
            to="/purchased"
          >
            View Purchased Courses
          </Link>
        </div>
      ) : (
        <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden max-w-3xl w-full text-gray-900 p-6">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              {course.image && (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <h2 className="text-2xl font-bold mt-4">{course.title}</h2>
              <p className="text-gray-600 mt-2">
                Price:{" "}
                <span className="text-red-500 font-bold">${course.price}</span>
              </p>
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
              <h2 className="text-lg font-semibold mb-4">
                Complete Your Payment
              </h2>
              <form onSubmit={handlePurchase} className="space-y-4">
                <label className="block text-gray-700">Credit/Debit Card</label>
                <CardElement
                  options={{
                    hidePostalCode: true,
                    style: { base: { fontSize: "16px" } },
                  }}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="submit"
                  disabled={!stripe || loading}
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </form>
              {cardError && (
                <p className="text-red-500 text-sm mt-2">{cardError}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Buy;
