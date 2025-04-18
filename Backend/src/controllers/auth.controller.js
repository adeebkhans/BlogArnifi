import User from '../models/user.model.js';
import { generateToken } from '../utils/generateToken.js';

/**
 * Registers a new user after validating required fields.
 * Rejects duplicate email registrations and returns a JWT token on success.
 */
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: 'User registered successfully.',
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Authenticates a user by verifying credentials.
 * Returns a JWT token upon successful login.
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    const isValid = user && await user.comparePassword(password);
    
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({
      message: 'Login successful.',
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};
