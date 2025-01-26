import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react';

export default function LoginForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, trigger } = useForm();

  // Load cached email from localStorage on component mount
  useEffect(() => {
    const cachedEmail = localStorage.getItem('email');
    // Placeholder: Use cachedEmail if necessary in the component logic
  }, []);

  // Handles login form submission
  const handleLoginSubmit = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", formData);
      alert(response.data.message);

      if (response.data.message === "login success") {
        localStorage.setItem('email', formData.email); // Save email to localStorage
        navigate("/", { state: formData }); // Redirect to home page
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      {/* Login Form */}
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        {/* Email Input */}
        <input
          {...register("email", { required: "Email is required" })}
          onBlur={() => trigger("email")} // Validate on blur
          placeholder="Email ID"
        />
        {errors.email && <span>{errors.email.message}</span>}

        {/* Password Input */}
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          onBlur={() => trigger("password")} // Validate on blur
          placeholder="Your password"
          type="password"
        />
        {errors.password && <span>{errors.password.message}</span>}

        {/* Submit Button */}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
