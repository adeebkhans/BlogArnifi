import express from 'express';
import { login, signup } from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * Authentication routes for user registration and login.
 * Each route returns a JWT on success.
 */

router.post('/signup', signup);
router.post('/login', login);

export default router;
