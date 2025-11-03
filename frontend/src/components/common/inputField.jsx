import React from "react";

const InputField = ({ register, name, type = "text", placeholder, error }) => (
  <div>
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default InputField;
