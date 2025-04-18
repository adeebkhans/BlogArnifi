import { useState } from "react";
import BlogEditor from "../editor/BlogEditor";
import { createBlog } from "../features/blog/blogAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle blog submission: prepares form data and triggers API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);
      if (image) formData.append("image", image);

      await createBlog(formData);
      toast.success("Blog created successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Blog title input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
          <input
            type="text"
            placeholder="Enter a catchy blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Category input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            placeholder="Enter the category of your blog"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Blog content editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <BlogEditor content={content} onChange={setContent} />
        </div>

        {/* Thumbnail image uploader */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Thumbnail</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        {/* Submit button with loading state */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200 shadow-md"
            disabled={loading}
          >
            {loading ? <span>Loading...</span> : "🚀 Publish Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
