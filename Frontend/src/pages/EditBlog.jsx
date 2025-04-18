import { useEffect, useState } from "react"; 
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateBlog } from "../features/blog/blogAPI";
import BlogEditor from "../editor/BlogEditor";

const EditBlog = () => {
  const { id } = useParams(); // Extract the blog ID from the URL parameters
  const blogs = useSelector((state) => state.blog.blogs); // Fetch all blogs from Redux store
  const existingBlog = blogs.find((blog) => blog._id === id); // Find the blog to edit based on the ID

  // Initialize state variables for blog data, content, image preview, and loading status
  const [blog, setBlog] = useState({ title: "", category: "", image: null });
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isNewImage, setIsNewImage] = useState(false); // Flag to track if a new image is selected
  const [loading, setLoading] = useState(false); // Loading state for form submission

  useEffect(() => {
    // Set existing blog data into state when the component mounts or blog data changes
    if (existingBlog) {
      setBlog({
        title: existingBlog.title || "",
        category: existingBlog.category || "",
        image: null, // Do not load existing image into state for editing
      });
      setContent(existingBlog.content || "");
      setImagePreview(existingBlog.image || ""); // Display existing image if available
    }
  }, [existingBlog]);

  const handleImageChange = (e) => {
    // Handle image file selection and set preview
    const file = e.target.files[0];
    if (!file) return; // Exit if no file is selected
    const imageURL = URL.createObjectURL(file); // Generate a URL for the selected image
    setImagePreview(imageURL); // Set the image preview
    setBlog({ ...blog, image: file }); // Set the selected image to the blog state
    setIsNewImage(true); // Mark that a new image has been selected
  };

  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = async (e) => {
    // Handle form submission to update the blog
    e.preventDefault();
    setLoading(true); // Set loading state to true during form submission
  
    try {
      // Prepare form data for API request
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("category", blog.category);
      formData.append("content", content);
  
      // Add image to form data if a new image is selected
      if (isNewImage && blog.image) {
        formData.append("image", blog.image);
      }
  
      // Update the blog via API call and display success message
      await updateBlog(id, formData);
      toast.success("Blog updated successfully");
      navigate("/"); // Navigate back to the home page after successful update
    } catch (error) {
      console.error(error); // Log any errors that occur during submission
      toast.error("Error updating blog"); // Show error message if update fails
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (!existingBlog) {
    // Display a message if the blog to edit is not found
    return <div className="text-center text-red-600 mt-10">Blog not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            placeholder="Update blog title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Category Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            value={blog.category}
            onChange={(e) => setBlog({ ...blog, category: e.target.value })}
            placeholder="Update blog category"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Trigger image selection handler
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-md mt-3"
            />
          )}
        </div>

        {/* Blog Content Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <BlogEditor content={content} onChange={setContent} /> {/* Editor for blog content */}
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-200 shadow-md"
            disabled={loading} // Disable the button while form is being processed
          >
            {loading ? (
              <span>Loading...</span> // Display loading text when processing
            ) : (
              "💾 Update Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
