import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Check if token exists in cookies or Authorization header
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  // If no token is found, throw an unauthorized error
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  try {
    // Verify the token using JWT_SECRET_KEY
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user associated with the decoded token's ID
    req.user = await User.findById(decoded.id);

    // If no user is found, throw an error
    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});
