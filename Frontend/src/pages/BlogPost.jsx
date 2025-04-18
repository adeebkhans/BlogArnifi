import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import { setClickedBlogId } from "../features/blog/blogSlice"; // Import the action
import { formatDate } from "../utils/formatDate";

const BlogPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Get the clicked blog ID from Redux store
  const clickedBlogId = useSelector(state => state.blog.clickedBlogId);

  // Get the list of blogs from Redux store
  const blogs = useSelector(state => state.blog.blogs);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set blog data from Redux based on clicked blog ID
    if (clickedBlogId) {
      const clickedBlog = blogs.find(blog => blog._id === clickedBlogId);
      if (clickedBlog) {
        setBlog(clickedBlog);
        setLoading(false);
      } else {
        setError("Blog not found");
        setLoading(false);
      }
    }
  }, [clickedBlogId, blogs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4" />
        <p className="text-gray-600">Loading blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10 text-lg">
        Error: {error}
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center mt-10">Blog not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{blog.title}</h1>
        {blog.category && (
          <p className="text-sm text-blue-500 font-semibold mb-2">{blog.category}</p>
        )}
        <p className="text-sm text-gray-500 mb-4">
          by <span className="text-gray-700 font-medium">{blog.author || 'Unknown Author'}</span> • {formatDate(blog.createdAt)}
        </p>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
          />
        )}

        <div className="prose prose-lg max-w-none text-gray-800 mb-8" dangerouslySetInnerHTML={{ __html: blog.content }} />
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")} // Navigate to home page when clicked
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg shadow-md"
          >
            Back to Blogs
          </button>
          <div className="text-sm text-gray-400">{formatDate(blog.updatedAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
