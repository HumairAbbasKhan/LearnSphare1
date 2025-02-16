import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import { v2 as cloudinary } from "cloudinary";

import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false, // 🚨 Temporary Test Only
  })
);

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         fontSrc: [
//           "'self'",
//           "https://fonts.gstatic.com",
//           "https://js.stripe.com",
//           "data:",
//           "https://fonts.googleapis.com",
//         ],
//         scriptSrc: ["'self'", "https://js.stripe.com"],
//         styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
//         connectSrc: ["'self'", "https://api.stripe.com"],
//         frameSrc: ["'self'", "https://js.stripe.com"],
//         imgSrc: ["'self'", "data:", "https://js.stripe.com"],
//       },
//     },
//   })
// );

// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/order", orderRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
