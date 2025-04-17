import express from 'express';
import authRoutes from './auth.routes.js';
import blogRoutes from './blog.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);

export default router;