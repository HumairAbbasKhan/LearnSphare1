import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BuyPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/course/${courseId}`
        );
        setCourse(response.data.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);
    setSuccess(null);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.");
      setProcessing(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/payments/create-intent`,
        {
          courseId,
          amount: course.price * 100,
        }
      );

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setSuccess("Payment successful! 🎉");
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    }

    setProcessing(false);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!course)
    return <p className="text-center text-red-500">Course not found.</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg flex max-w-4xl w-full">
        <div className="w-1/2 p-6">
          <img
            src={course.image.url}
            alt={course.title}
            className="rounded-lg w-full h-64 object-cover mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
          <p className="text-gray-600 mt-2">{course.description}</p>
          <div className="mt-4 text-lg font-semibold text-gray-900">
            ${course.price}{" "}
            <span className="text-gray-500 line-through text-sm">
              ${(course.price * 1.2).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="w-1/2 bg-gray-50 p-6 rounded-r-lg">
          <Elements stripe={stripePromise}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <CardElement
                className="p-3 border rounded-lg"
                options={{ hidePostalCode: true }}
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold"
                disabled={!stripe || processing}
              >
                {processing ? "Processing..." : `Pay $${course.price}`}
              </button>
            </form>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
