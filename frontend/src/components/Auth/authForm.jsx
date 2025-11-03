import React from "react";
import InputField from "../common/inputField";

const AuthForm = ({ isLogin, onSubmit, formMethods, loading }) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  const fields = [
    !isLogin && { name: "name", placeholder: "Full Name" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
    !isLogin && {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
  ].filter(Boolean);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map(({ name, type = "text", placeholder }) => (
        <InputField
          key={name}
          register={register}
          name={name}
          type={type}
          placeholder={placeholder}
          error={errors[name]?.message}
        />
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform duration-200 text-white py-2 rounded-md"
      >
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
