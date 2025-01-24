import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh", backgroundColor: "red", }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <input
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
        <input type="submit" />
      </form>
    </div>
  );
}