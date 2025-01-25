
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react';

export default function App() {
  
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, trigger } = useForm();

  // On component mount, load the email from localStorage
  useEffect(() => {
    const cachedEmail = localStorage.getItem('email');
    
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/login`, data);
      alert(res.data.message);
      if (res.data.message === "login success") {
       
        localStorage.setItem('email', data.email);
        navigate("/", { state: data });
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center flex-col bg-red-600 h-[100vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="bg-white w-full"
          {...register("email", { required: "Email is required" })}
          onBlur={() => trigger("email")}
          placeholder="Email ID"
        />
        <br />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          className="bg-white w-full"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Password must include at least one uppercase letter and one special character",
            },
          })}
          onBlur={() => trigger("password")}
          placeholder="Your password"
          type="password"
        />
        <br />
        {errors.password && <span>{errors.password.message}</span>}
        <br />
        <input className="bg-white w-full" type="submit" />
      </form>
    </div>
  );
}
