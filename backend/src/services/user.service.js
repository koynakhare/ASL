import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
      throw new AppError("No users found", 404);
    }
    return users;
  } catch (err) {
    throw new AppError(err.message || "Failed to fetch users", 500);
  }
};
