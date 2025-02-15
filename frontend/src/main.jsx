import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51PGXh9P1SZHJyrT1mx5hhuIuzy1ULcuBkpGcFvYpi8U7ZY54Z1g2p1E1Of6aHwvInrF9EAPCkBpSHO9qIDNMca8I00hevNAiW7"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);
