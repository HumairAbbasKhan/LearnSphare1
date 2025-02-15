import dotenv from "dotenv";
dotenv.config();

export default {
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
