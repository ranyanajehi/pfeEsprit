import { User } from "../models/userSchema.js";

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

import jwt from "jsonwebtoken";

// Middleware to authenticate dashboard users
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Dashboard User is not authenticated!", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resource!`,
        403
      )
    );
  }
  next();
});

// Middleware to authenticate frontend users
export const isStudentAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.studentToken;
    console.log(token, "tokennnnnnnnnnnnnnnnnnnnnnnnnnn");
    if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).populate({
      path: "rooms",
      populate: {
        path: "users",
        model: "User",
      },
    });
    if (req.user.role !== "Student") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized for this resource!`,
          403
        )
      );
    }
    next();
  }
);
