import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { config } from "../config/index.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization
    }

    if (!token) {
      throw new AppError("Not authorized, no token provided", 401);
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) throw new AppError("User not found", 404);

    req.user = user;
    next();
  } catch (err) {
    next(new AppError("Not authorized or invalid token", 401));
  }
};
