export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  console.log("process.env.COOKIE_EXPIRE", process.env.COOKIE_EXPIRE);
  // Determine the cookie name based on the user's role
  const cookieName = user.role === "Admin" ? "adminToken" : "studentToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: 365,
      maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000, // Max age in milliseconds
      // httpOnly: true, // Cookie is accessible only through HTTP(S) request, not JavaScript
      // secure: false, // Cookie will only be sent over HTTPS in production
      // sameSite: "none", // Allows cross-site requests
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
