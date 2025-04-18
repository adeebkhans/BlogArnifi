import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateBlog } from "../features/blog/blogAPI";
import BlogEditor from "../editor/BlogEditor";

const EditBlog = () => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blog.blogs); // Access all blogs from Redux
  const existingBlog = blogs.find((blog) => blog._id === id); // Find the blog to edit

  const [blog, setBlog] = useState({ title: "", category: "", image: null }); // Initialize image to null
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isNewImage, setIsNewImage] = useState(false); // Track if a new image is selected
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (existingBlog) {
      setBlog({
        title: existingBlog.title || "",
        category: existingBlog.category || "",
        image: null, // Don't load existing image into file state for editing
      });
      setContent(existingBlog.content || "");
      setImagePreview(existingBlog.image || "");
    }
  }, [existingBlog]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageURL = URL.createObjectURL(file);
    setImagePreview(imageURL);
    setBlog({ ...blog, image: file });
    setIsNewImage(true); // Indicate a new image has been selected
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("category", blog.category);
      formData.append("content", content);
  
      if (isNewImage && blog.image) {
        formData.append("image", blog.image);
      }
  
      await updateBlog(id, formData);
      toast.success("Blog updated successfully");
      navigate("/"); // ✅ use navigate here
    } catch (error) {
      console.error(error);
      toast.error("Error updating blog");
    } finally {
      setLoading(false);
    }
  };
  

  if (!existingBlog) {
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
            onChange={handleImageChange}
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

        {/* Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <BlogEditor content={content} onChange={setContent} />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-200 shadow-md"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <span>Loading...</span> // Show loading text or spinner when loading
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
