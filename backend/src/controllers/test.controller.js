import { getAllTestsService, submitTestService } from "../services/test.service.js";
import { apiHandler } from "../utils/apiHandler.js";
import { sendSuccess } from "../utils/successHandler.js";

/**
 * Submit a new test with attempts
 * POST /api/tests
 */
export const submitTestController = apiHandler(async (req, res) => {
  // Assuming you have authentication middleware that sets req.user
  const userId = req.user.id;

  if (!req.body || !Array.isArray(req.body.results)) {
    return res.status(400).json({ success: false, message: "Invalid request body" });
  }

  const result = await submitTestService(userId, req.body);

  return sendSuccess(res, 201, "Test submitted successfully", result);
});

/**
 * Get all tests for the logged-in user
 * GET /api/tests
 */
export const getAllTestsController = apiHandler(async (req, res) => {
  const userId = req.user.id;

  const result = await getAllTestsService(userId);

  return sendSuccess(res, 200, "Tests fetched successfully", result);
});
