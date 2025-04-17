import express from 'express';
import { upload } from '../middleware/upload.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
} from '../controllers/blog.controller.js';

const router = express.Router();

router.get('/', protect, getBlogs);
router.post('/', protect, upload.single('image'), createBlog);
router.put('/:id', protect, upload.single('image'), updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;
