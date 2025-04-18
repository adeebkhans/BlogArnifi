import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useDispatch } from 'react-redux';
import { setClickedBlogId } from '../features/blog/blogSlice';

const BlogCard = ({ blog }) => {
  const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(setClickedBlogId(blog._id)); // Dispatch action to set clicked blog ID in Redux store
  };

  return (
    <Link
      to={`/blogs/${blog._id}`}
      className="block no-underline text-black hover:shadow-lg transition duration-300"
      onClick={handleCardClick} // Dispatch the action when card is clicked
    >
      <div className="bg-white rounded shadow p-4 mb-4 h-[400px] w-[300px] flex flex-col justify-between">
        <div className="relative w-full h-[56.25%]">
          <img
            src={blog.image || defaultImage}
            alt="thumbnail"
            className="absolute top-0 left-0 w-full h-full object-cover rounded"
          />
        </div>
        <h2 className="text-xl font-semibold mt-2 truncate">{blog.title}</h2>
        {blog.category && <p className="text-sm text-blue-500 font-semibold mt-1">{blog.category}</p>}
        <p className="text-sm text-gray-500 mt-1">by {blog.author || 'Unknown Author'} • {formatDate(blog.createdAt)}</p>
        <div className="mt-2 text-sm text-gray-700 overflow-hidden" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 250) + "..." }} />
      </div>
    </Link>
  );
};

export default BlogCard;
