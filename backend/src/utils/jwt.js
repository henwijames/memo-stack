import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;
const REFRESH = process.env.JWT_REFRESH;

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, REFRESH, { expiresIn: "7d" });
};
