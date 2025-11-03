import * as yup from "yup";

export const schemas = {
  register: yup.object({
    username: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"), password: yup
      .string()
      .trim()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  }),
  login: yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),

  }),
};