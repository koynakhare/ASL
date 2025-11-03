import { getAllSignsService } from '../services/sign.service.js';
import { sendSuccess } from '../utils/successHandler.js'; // wherever you store these helpers
import { apiHandler } from '../utils/apiHandler.js';

export const getAllSignsController = apiHandler(async (req, res) => {
  const signs = await getAllSignsService();
  sendSuccess(res, 200, "Signs fetched successfully", signs);
});
