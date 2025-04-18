import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/**
 * Login component for authenticating users.
 * Manages form input, triggers login action, and provides feedback on login status.
 */
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Tracks API request status
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles login form submission.
   * Dispatches loginUser action with form data and navigates on success.
   * Displays toast messages based on request result.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await dispatch(loginUser(form));
    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error(res.payload);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

        {/* Email input field */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password input field */}
        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit button with loading indicator */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Navigation link for users without an account */}
        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:text-blue-700">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
