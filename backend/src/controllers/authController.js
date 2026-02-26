import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { signToken } from '../services/authService.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'Email already in use');
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role: 'user' });

  const token = signToken(user);
  res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
};
