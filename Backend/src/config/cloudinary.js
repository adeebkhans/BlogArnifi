import { v2 as cloudinary } from 'cloudinary';

/**
 * Configures the Cloudinary client using environment variables.
 * This setup is required before invoking upload or deletion operations.
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image buffer to a specified Cloudinary folder.
 * Returns a Promise resolving to the secure image URL.
 *
 * @param {Buffer} buffer - The binary data of the image.
 * @param {string} folder - The target folder in Cloudinary (default: 'blogs').
 */
export const uploadToCloudinary = (buffer, folder = 'blogs') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return reject(error);
                }
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

/**
 * Extracts the public_id used by Cloudinary from a given image URL.
 * Assumes the folder is part of the URL path (e.g., 'blogs/filename').
 *
 * @param {string} url - The full URL of the image hosted on Cloudinary.
 * @returns {string} public_id in the format "folder/filename"
 */
const extractPublicId = (url) => {
    // Example: https://res.cloudinary.com/demo/image/upload/v1713459517/blogs/abc123.jpg
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const [public_id] = filename.split('.');
    const folder = parts[parts.length - 2];
    return `${folder}/${public_id}`;
};

/**
 * Deletes an image from Cloudinary using its URL.
 * If the imageUrl is invalid or missing, the function exits silently.
 *
 * @param {string} imageUrl - Full Cloudinary image URL to be deleted.
 */
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
