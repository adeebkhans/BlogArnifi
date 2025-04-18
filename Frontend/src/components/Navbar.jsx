import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://arnifi.com/_next/static/media/Arnifi%20Primary%20Logo_Blue.8fc3f7c3.svg"
            alt="Arnifi Logo"
            className="h-8 w-auto"
          />
          <span className="text-lg font-semibold text-blue-700 hidden sm:inline">Blogify</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to="/my-blogs"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                My Blogs
              </Link>
              <Link
                to="/create"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Create
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="text-red-500 hover:text-red-700 font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition font-medium border border-gray-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
