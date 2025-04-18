import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/**
 * Signup component for user registration.
 * Handles user input, form submission, and dispatches signup action.
 * Displays success or error messages via toast notifications.
 */
const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false); // Indicates form submission state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles form submission.
   * Dispatches signupUser action with form data and navigates on success.
   * Displays appropriate toast messages based on request outcome.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await dispatch(signupUser(form));
    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Signup successful");
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
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>

        {/* Name input field */}
        <div>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

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

        {/* Submit button with loading state */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>

        {/* Link to login page for existing users */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-700">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
