import Course from "../models/courseModel.js";
import Purchase from "../models/purchaseModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import Stripe from "stripe";
import config from "../config.js";
export const createCourse = async (req, res) => {
  const { title, description, price } = req.body;
  const adminId = req.adminId;
  try {
    if (!title || !description || !price) {
      console.log(title, description, price);
      return res.status(400).json({
        success: false,
        error: "Please provide all required fields",
      });
    }

    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ success: false, error: "No image uploaded" });
    }

    const file = req.files.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "courses",
    });

    const course = new Course({
      title,
      description,
      price,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      createrId: adminId,
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.error("Course Creation Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  const { title, description, price, createrId } = req.body;

  try {
    const isAdmin = await Admin.findById(adminId);
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can modify courses.",
      });
    }

    let updateData = { title, description, price, createrId };

    if (req.files && req.files.image) {
      const file = req.files.image;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "courses",
      });

      updateData.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    const course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const adminId = req.adminId;

  try {
    const isAdmin = await Admin.findById(adminId);
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can delete courses.",
      });
    }
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (course.image && course.image.public_id) {
      await cloudinary.uploader.destroy(course.image.public_id);
    }
    await Course.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const buyCourse = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, error: "Course not found" });
    }

    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({
        success: false,
        error: "User has already purchased this course",
      });
    }
    const amountInCents = course.price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(201).json({
      success: true,
      message: "Course purchased successfully",
      course: {
        _id: course._id,
        title: course.title,
        price: course.price,
        description: course.description,
        image: course.image ? course.image.url : null,
      },
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
