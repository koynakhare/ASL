import { apiHandler } from "../utils/apiHandler.js";
import { sendSuccess } from "../utils/successHandler.js";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = apiHandler(async (req, res) => {
  const result = await registerUser(req.body);
  return sendSuccess(res, 201, "User registered successfully", result);
});

export const login = apiHandler(async (req, res) => {
  const result = await loginUser(req.body);
  return sendSuccess(res, 200, "Login successful", result);
});
