import { useForm } from "react-hook-form";
import axios from "axios";
export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async(data) =>{
    console.log(data);
    await axios.post(`http://localhost:3000/api/signup`,data)
    .then((res) => {
    alert(res.data.message)
   
    })
    .catch((err) => {
      alert(err.response.data.message)
    })


  } 
  


  return (
    <div className="flex justify-center items-center flex-col bg-red-600 h-[100vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <input
        className="bg-white w-full"
          {...register("email", {
            required: "Email is required",
           
          })}
          onBlur={() => trigger("email")} // Validate on blur
          placeholder="Email ID"
        />
        <br />
        {errors.email && <span>{errors.email.message}</span>}

        {/* Name Input */}
        <input
        className="bg-white w-full"
          {...register("name", {
            required: "Name is required",
          })}
          onBlur={() => trigger("name")} // Validate on blur
          placeholder="Enter your name"
        />
        <br />
        {errors.name && <span>{errors.name.message}</span>}

        {/* Password Input */}
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
              message:
                "Password must include at least one uppercase letter and one special character",
            },
          })}
          onBlur={() => trigger("password")} // Validate on blur
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