import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import BlogCard from "../components/BlogCard";
import BlogFilter from "../components/BlogFilter";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  const handleFilter = (filters) => {
    dispatch(fetchBlogs(filters));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">
        Arnifi Blogs
      </h1>

      <div className="mb-8 p-4 bg-white shadow rounded-md">
        <BlogFilter onFilter={handleFilter} />
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-600 text-lg py-10">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          No blogs found. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;