import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access - Token missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1]; // ✅ Extract only the token part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // optional: store decoded data
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access - Invalid token",
      error: error.message,
    });
  }
};

export default auth;
