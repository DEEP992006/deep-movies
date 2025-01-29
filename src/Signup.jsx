import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const handleFormSubmit = async (formData) => {
    console.log(formData);

    try {
      const response = await axios.post("http://localhost:3000/api/signup", formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Email Input */}
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
                placeholder="Email ID"
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                onBlur={() => trigger("name")}
                placeholder="Enter your name"
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Password Input */}
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
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                onBlur={() => trigger("password")}
                placeholder="Your password"
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all font-medium gap-2"
          >
            Sign Up <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}