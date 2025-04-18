import Blog from '../models/blog.model.js';
import cloudinary from '../config/cloudinary.js';
import { deleteFromCloudinary, uploadToCloudinary  } from '../config/cloudinary.js';

export const createBlog = async (req, res, next) => {
    try {
        const { title, category, content } = req.body;

        if (!title || !category || !content) {
            return res.status(400).json({
                message: 'Title, category, and content are required to create a blog.',
            });
        }

        let imageUrl = '';
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.buffer);
        }


        const blog = await Blog.create({
            title,
            category,
            content,
            image: imageUrl,
            author: req.user.name,
            userId: req.user._id,
        });

        res.status(201).json({
            message: 'Blog created successfully.',
            blog,
        });
    } catch (error) {
        next(error);
    }
};

export const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found.' });

        if (!blog.userId.equals(req.user._id)) {
            return res.status(403).json({ message: 'You can only update your own blogs.' });
        }

        const hasFile = !!req.file;

        // Require at least one field
        if (!(req.body.title) && !req.body.category && !req.body.content && !hasFile) {
            return res.status(400).json({
                message: 'At least one of title, category, content, or image must be provided to update.',
            });
        }

        const { title, category, content } = req.body;

        if (title) blog.title = title;
        if (category) blog.category = category;
        if (content) blog.content = content;

        if (hasFile) {
            const newImageUrl = await uploadToCloudinary(req.file.buffer);
            if (blog.image && blog.image !== newImageUrl) {
                await deleteFromCloudinary(blog.image);
            }
            blog.image = newImageUrl;
        }

        blog.updatedAt = new Date();
        const updatedBlog = await blog.save();

        res.status(200).json({
            message: 'Blog updated successfully.',
            blog: updatedBlog,
        });
    } catch (error) {
        next(error);
    }
};

export const getBlogs = async (req, res, next) => {
    try {
        const { category, author } = req.query;
        const filter = {};
        if (category) {
            filter.category = { $regex: category, $options: 'i' };
        }
        if (author) {
            filter.author = { $regex: author, $options: 'i' }; // case insensitive search
        }

        const blogs = await Blog.find(filter);
        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
};

// export const getMyBlogs = async (req, res, next) => {
//     try {
//         const blogs = await Blog.find({ userId: req.user._id });
//         res.status(200).json(blogs);
//     } catch (error) {
//         next(error);
//     }
// };


export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        if (!blog.userId.equals(req.user._id)) {
            return res.status(403).json({ message: 'You can only delete your own blogs.' });
        }
        // Delete image from Cloudinary if exists
        if (blog.image) {
            await deleteFromCloudinary(blog.image);
        }

        await Blog.findByIdAndDelete(blog._id);
        res.status(200).json({ message: 'Blog deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
