import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error(res.payload);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200">Login</button>
        </div>
        <p className="text-center text-gray-600 text-sm">Don't have an account? <a href="/signup" className="text-blue-600 hover:text-blue-700">Sign up</a></p>
      </form>
    </div>
  );
};

export default Login;
