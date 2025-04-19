import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { deleteBlog } from "../features/blog/blogAPI"; // Blog deletion API call

const MyBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  // Fetch blogs once the user is authenticated
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, user?._id]);

  // Handle blog deletion and refresh blog list after successful delete
  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId);
      dispatch(fetchBlogs());
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Display loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4" />
        <p className="text-gray-600">Loading your blogs...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="text-center text-red-500 py-10 text-lg">{error}</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">📚 My Blogs</h2>

      {/* Check if user has created any blogs */}
      {blogs.filter(blog => blog.userId === user?._id).length === 0 ? (
        <div className="text-gray-600 text-center text-lg">
          You haven't written any blogs yet.{" "}
          <Link to="/create" className="text-blue-600 hover:underline">
            Start writing →
          </Link>
        </div>
      ) : (
        // Render user's blogs in a responsive grid layout
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs
            .filter(blog => blog.userId === user?._id)
            .map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition flex flex-col h-full"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {blog.title}
                </h3>
                <img
                  src={blog.image || defaultImage}
                  alt="thumbnail"
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                {/* Display a content preview as HTML, limited to 150 characters */}
                <div
                  className="text-gray-600 text-sm line-clamp-4 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 150) + "...",
                  }}
                />
                {/* Action buttons: Edit and Delete */}
                <div className="mt-auto flex justify-between w-full">
                  <Link
                    to={`/edit/${blog._id}`}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    ✏️ Edit Blog
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-sm text-red-600 hover:text-red-800 font-medium cursor-pointer"
                  >
                    🗑️ Delete Blog
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
