export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err);

  const status = err.statusCode || 500;
  const message =
    err.isOperational && err.message
      ? err.message
      : "Something went wrong on the server.";

  res.status(status).json({
    success: false,
    error: message,
  });
};
