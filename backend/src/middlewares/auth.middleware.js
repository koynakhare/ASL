// middlewares/protect.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { config } from "../config/index.js";

const publicRoutes = [
  "/api/sign",
  "/api/auth/login",
  "/api/auth/register",
  "/api/public-info",
];

export const protect = async (req, res, next) => {
  try {
    const isPublic = publicRoutes.some(route => req.path.startsWith(route));
    if (isPublic) {
      return next(); 
    }

    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization
    }

    if (!token) {
      throw new AppError("Not authorized, no token provided", 401);
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new AppError("User not found", 404);
    }

    req.user = user;
    next();
  } catch (err) {
    next(new AppError("Not authorized or invalid token", 401));
  }
};
