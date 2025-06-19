import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization required" });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(id).select('-password'); // Don't send password
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default requireAuth;
