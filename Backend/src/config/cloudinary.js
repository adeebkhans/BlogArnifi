import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (buffer, folder = 'blogs') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

// Extracts public_id from a Cloudinary image URL
const extractPublicId = (url) => {
    // Example: https://res.cloudinary.com/demo/image/upload/v1713459517/blogs/abc123.jpg
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const [public_id] = filename.split('.'); // remove extension
    const folder = parts[parts.length - 2]; // assuming "blogs" folder
    return `${folder}/${public_id}`;
};

export const deleteFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return;

        const public_id = extractPublicId(imageUrl);
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.error('❌ Cloudinary deletion failed:', error);
    }
};

export default cloudinary;
