// Mongoose model for Blog
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    category: { // e.g., "Career", "Finance", "Travel"
        type: String,
        required: true

    },
    author: { // populated from user data
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: { // optional URL
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now

    },
    updatedAt: {
        type: Date, default: Date.now

    }
});

export default mongoose.model('Blog', blogSchema);
