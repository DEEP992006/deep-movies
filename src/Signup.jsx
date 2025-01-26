import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  // Initialize form functions from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  // Handles form submission
  const handleFormSubmit = async (formData) => {
    console.log(formData);

    try {
      const response = await axios.post("http://localhost:3000/api/signup", formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
    navigate("/login");
  };

  return (
    <div>
      {/* Signup Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Email Input Field */}
        <input
          {...register("email", {
            required: "Email is required",
          })}
          onBlur={() => trigger("email")} // Validate on blur
          placeholder="Email ID"
        />
        {errors.email && <span>{errors.email.message}</span>}

        {/* Name Input Field */}
        <input
          {...register("name", {
            required: "Name is required",
          })}
          onBlur={() => trigger("name")} // Validate on blur
          placeholder="Enter your name"
        />
        {errors.name && <span>{errors.name.message}</span>}

        {/* Password Input Field */}
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
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
}
