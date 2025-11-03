import Joi from "joi";
import { AppError } from "../utils/AppError.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return next(new AppError(message, 400));
  }
  next();
};
