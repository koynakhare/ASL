// utils/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err);

  const statusCode = err.statusCode || 500;
  const message =
    err.isOperational && err.message
      ? err.message
      : "Something went wrong on the server.";

  return res.status(statusCode).json({
    success: false,
    message, 
  });
};
