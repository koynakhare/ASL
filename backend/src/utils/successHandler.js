
export const sendSuccess = (res, statusCode = 200, message = "Success", data = null) => {
  const payload = {
    success: true,
    message,
  };

  if (data !== null && data !== undefined) {
    payload.data = data;
  }

  return res.status(statusCode).json(payload);
};
