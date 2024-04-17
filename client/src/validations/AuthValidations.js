import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters!")
    .max(50, "Username cannot be more than 50 characters.")
    .required("Username is required!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters!")
    .max(50, "Password cannot be more than 50 characters.")
    .required("Password is required!"),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters!")
    .max(50, "Username cannot be more than 50 characters.")
    .required("Username is required!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters!")
    .max(50, "Password cannot be more than 50 characters.")
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .min(8, "Confirm Password must be at least 8 characters!")
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required!"),
});
