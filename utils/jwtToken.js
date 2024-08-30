export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  res.status(statusCode).json({
    success: true,
    user,
    message,
    token, // Include the token in the response body
  });
};
