import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  // Load cached email from localStorage when component mounts
  useEffect(() => {
    const cachedEmail = localStorage.getItem('email');
    // If needed, pre-fill email input (currently not used)
  }, []);

  // Handles login form submission
  const handleLoginSubmit = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", formData);
      alert(response.data.message);

      if (response.data.message === "login success") {
        localStorage.setItem('email', formData.email); // Store email for persistence
        navigate("/", { state: formData }); // Redirect to home page
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login failed, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-6">
          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                onBlur={() => trigger("email")}
                placeholder="Enter your email"
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Input Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
                onBlur={() => trigger("password")}
                placeholder="Enter your password"
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all font-medium gap-2"
          >
            Login <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
