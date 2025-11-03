import { apiHandler } from "../utils/apiHandler.js";
import { getAllUsers } from "../services/user.service.js";
import { sendSuccess } from "../utils/successHandler.js";

export const getUsers = apiHandler(async (req, res) => {
  const users = await getAllUsers();
  return sendSuccess(res, 200, "User list fetched successfully", users);
});
